import { accessibleBy } from '@casl/prisma';
import { Injectable, Logger } from '@nestjs/common';
import Fuse from 'fuse.js';
import natural from 'natural';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import { Element, ElementOmittedFields } from 'src/dtos/types/element.dto';
import {
  ABILITY_ACTION_LIST,
  defineAbilityForUser,
} from 'src/graphql/abilities';
import * as stopword from 'stopword';
import { ElementSearchInput } from 'test/graphql-client/graphql';
import { PrismaService } from '../database/prisma.service';
import {
  elementLanguageFilterQuery,
  noSnapshotElementFilterQuery,
} from '../element/shared-prisma-queries';
import { UserService } from '../user/user.service';
import { ElementSearchKeywords } from './search-element-v2.dto';

@Injectable()
export class ElementSearchV2Service {
  private readonly logger = new Logger(ElementSearchV2Service.name);
  private tokenizerDe = new natural.AggressiveTokenizerDe();
  private stemmerDe = natural.PorterStemmerDe;

  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async keywords(
    userRequestId: string | undefined,
    elementSearchInput: ElementSearchInput,
  ): Promise<ElementSearchKeywords> {
    const elements = await this.collectElementsForSearch(
      userRequestId,
      elementSearchInput,
    );
    const { tfidf, uniqueWords, stemmedToRawMappings, rawToStemmedMappings } =
      this.createTfidf(elements, true);

    if (!stemmedToRawMappings || !rawToStemmedMappings) {
      throw new Error('Stemmed to raw mappings are not available.');
    }

    const fuse = new Fuse(Array.from(rawToStemmedMappings.keys()), {
      isCaseSensitive: false,
      includeScore: true,
      shouldSort: true,
      threshold: 0.4,
    });

    const similarKeywords = elementSearchInput.text
      ? fuse.search(elementSearchInput.text, { limit: 10 }).map((r) => ({
          keyword: r.item,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          score: r.score!,
        }))
      : undefined;

    this.logger.debug('Similar Keywords:');
    this.logger.debug(similarKeywords);

    return {
      similarKeywords: similarKeywords,
      uniqueKeywordsCount: uniqueWords.size,
      documentsCount: elements.length,
      keywords: [...uniqueWords]
        .map((k) => ({
          keyword: k,
          idf: tfidf.idf(k),
          originalKeywords: [...(stemmedToRawMappings?.get(k) ?? [])],
        }))
        .sort((a, b) => a.idf - b.idf),
    };
  }

  async searchElements(
    userRequestId: string | undefined,
    elementSearchInput: ElementSearchInput,
    paginationArgs: PaginationArgs,
  ): Promise<Omit<Element, ElementOmittedFields>[]> {
    // TODO use https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
    // TODO have to switch to database only query to filter everything at once or filter in client in the searchElementsContent function
    const elementsFromContent = await this.searchElementsContent(
      userRequestId,
      elementSearchInput,
      paginationArgs,
    );
    return elementsFromContent;
  }

  private async searchElementsContent(
    userRequestId: string | undefined,
    elementSearchInput: ElementSearchInput,
    paginationArgs: PaginationArgs,
  ): Promise<Omit<Element, ElementOmittedFields>[]> {
    const elements = await this.collectElementsForSearch(
      userRequestId,
      elementSearchInput,
    );
    const inputText = elementSearchInput.text ?? '';
    if (inputText.length === 0) {
      return elements.slice(
        paginationArgs.skip,
        paginationArgs.skip + paginationArgs.take,
      ) as Omit<Element, ElementOmittedFields>[] as Element[];
    }

    const titlesAndTagsFuse = new Fuse(elements, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'tags.name', weight: 1 },
      ],
      isCaseSensitive: false,
      includeScore: true,
      shouldSort: true,
      threshold: 0.8,
    });

    const titlesAndTagsResults = titlesAndTagsFuse
      .search(inputText)
      .map((r) => r.item);

    const { tfidf } = this.createTfidf(elements);
    const { stemmedTokens: preprocessedInput } =
      this.preprocessTextDe(inputText);

    let result: { i: number; measure: number; key?: string }[] = [];
    tfidf.tfidfs(preprocessedInput, function (i, measure, key) {
      result.push({ i, measure, key });
    });
    const threshold = 0.1;
    result.sort((a, b) => a.measure - b.measure);
    result = result.filter((r) => r.measure > threshold);
    const elementMatches = result.map(
      (r) => elements[r.i] as Omit<Element, ElementOmittedFields>,
    ) as Element[];

    const combinedResult = [...titlesAndTagsResults, ...elementMatches].slice(
      paginationArgs.skip,
      paginationArgs.skip + paginationArgs.take,
    );

    return combinedResult;
  }

  private createTfidf(
    elements: Awaited<
      ReturnType<ElementSearchV2Service['collectElementsForSearch']>
    >,
    calculateStemmedWordsMap = false,
  ) {
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    const uniqueWords = new Set<string>();
    const stemmedToRawMappings: Map<string, Set<string>> = new Map();
    const rawToStemmedMappings: Map<string, Set<string>> = new Map();

    elements.forEach((element) => {
      const textToPreprocess = `${element.name} ${element.tags
        .map((t) => t.tag.name)
        .join(', ')} ${element.markdown ?? ''}`;
      const { stemmedTokens, tokensWithoutStopwords } =
        this.preprocessTextDe(textToPreprocess);
      tfidf.addDocument(stemmedTokens);
      const words = stemmedTokens;
      words.forEach((word) => uniqueWords.add(word));

      if (calculateStemmedWordsMap) {
        for (let i = 0; i < stemmedTokens.length; i++) {
          const stemmedToRawMappingsEntry =
            stemmedToRawMappings.get(stemmedTokens[i]) ?? new Set();
          stemmedToRawMappingsEntry.add(tokensWithoutStopwords[i]);
          stemmedToRawMappings.set(stemmedTokens[i], stemmedToRawMappingsEntry);

          const rawToStemmedMappingsEntry =
            rawToStemmedMappings.get(tokensWithoutStopwords[i]) ?? new Set();
          rawToStemmedMappingsEntry.add(stemmedTokens[i]);
          rawToStemmedMappings.set(
            tokensWithoutStopwords[i],
            rawToStemmedMappingsEntry,
          );
        }
      }
    });
    return {
      tfidf,
      uniqueWords,
      stemmedToRawMappings: calculateStemmedWordsMap
        ? stemmedToRawMappings
        : undefined,
      rawToStemmedMappings: calculateStemmedWordsMap
        ? rawToStemmedMappings
        : undefined,
    };
  }

  private preprocessTextDe(text: string): {
    /**
     * Stemmed tokens.
     */
    stemmedTokens: string[];
    /**
     * Tokens without stopwords.
     */
    tokensWithoutStopwords: string[];
    /**
     * Tokens with stopwords.
     */
    tokens: string[];
  } {
    const tokens = this.tokenizerDe.tokenize(text);
    const tokensWithoutStopwords = stopword.removeStopwords(
      tokens,
      stopword.deu,
    );
    const stemmedTokens = tokensWithoutStopwords.map((token) =>
      this.stemmerDe.stem(token.toLowerCase()),
    );
    return {
      stemmedTokens,
      tokensWithoutStopwords,
      tokens,
    };
  }

  private async collectElementsForSearch(
    userRequestId: string | undefined,
    input: ElementSearchInput,
  ) {
    const user = await this.userService.findUserById(
      userRequestId,
      userRequestId,
    );
    const ability = defineAbilityForUser(userRequestId);

    const FALLBACK_LANGUAGE_CODE = 'en';
    const languageCodes = input.languageCode
      ? [input.languageCode]
      : user?.languageCodes ?? [FALLBACK_LANGUAGE_CODE];

    const elements = await this.prismaService.element.findMany({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_LIST).Element,
          noSnapshotElementFilterQuery,
          elementLanguageFilterQuery(userRequestId, languageCodes),
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return elements;
  }
}
