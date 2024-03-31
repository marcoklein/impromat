import { accessibleBy } from '@casl/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { Element, Prisma } from 'prisma/prisma-client';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import { ElementOmittedFields } from 'src/dtos/types/element.dto';
import {
  ABILITY_ACTION_LIST,
  defineAbilityForUser,
} from 'src/graphql/abilities';
import { ElementSearchInput } from 'test/graphql-client/graphql';
import { PrismaService } from '../database/prisma.service';
import {
  elementLanguageFilterQuery,
  noSnapshotElementFilterQuery,
} from '../element/shared-prisma-queries';
import { UserService } from '../user/user.service';
import {
  ElementSearchMatch,
  ElementSearchResult,
} from './element-search-result.dto';

/**
 * This service provides search functionality for elements by a single search text.
 *
 * **Implementation notes:**
 *
 * This search is currently using functionality provided by Prisma only which limits the search capabilities but makes the code simpler to read.
 * However, in the mid-term future we plan on switching to a raw-SQL query that can also provide a ranking of search results.
 */
@Injectable()
export class ElementSearchService {
  private readonly logger = new Logger(ElementSearchService.name);

  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  /**
   * Input arguments provide a single search text that is used to search in the
   * element name, markdown, and tags. The search is performed using a logical OR
   * between the fields and a logical OR between the search terms. The search
   * is case-insensitive.
   *
   * If returnMatches is set to true, this function will also return information about
   * the exact matches of the search term in the element. This information can be used
   * to highlight the search term in the search results.
   *
   * @param userRequestId User ID of the requesting user.
   * @param elementSearchInput Search input.
   * @param paginationArgs Pagination arguments.
   * @returns Search results.
   */
  async searchElements(
    userRequestId: string | undefined,
    elementSearchInput: ElementSearchInput,
    paginationArgs: PaginationArgs,
  ): Promise<Omit<ElementSearchResult, ElementOmittedFields>[]> {
    const MAX_SEARCH_TERMS = 10;

    const splittedTextSearch = elementSearchInput.text
      ?.trim()
      .replaceAll('#', '')
      .replaceAll(/' +'/g, '')
      .split(' ');
    this.logger.debug(`Splitted text search: `, splittedTextSearch);

    if (
      !splittedTextSearch ||
      !splittedTextSearch.length ||
      (splittedTextSearch.length === 1 && !splittedTextSearch[0].length) ||
      splittedTextSearch.length > MAX_SEARCH_TERMS
    ) {
      this.logger.debug(
        `Empty search or too many search terms. Returning all elements.`,
      );
      const dbElements = await this.fetchElementsForEmptySearch(
        userRequestId,
        elementSearchInput,
        paginationArgs,
      );
      return dbElements.map((e) => ({
        matches: [],
        element: e,
        score: 0,
      })) as ElementSearchResult[];
    }

    const startTime = Date.now();
    this.logger.log(
      `Searching for elements with text: ${elementSearchInput.text}`,
    );

    const dbElements = await this.searchElementsWithText(
      userRequestId,
      elementSearchInput,
      paginationArgs,
      splittedTextSearch,
    );

    this.logger.debug(`Search for elements took ${Date.now() - startTime}ms`);

    return dbElements.map((e) => ({
      matches: this.findSearchResultMatchesInElement(e, splittedTextSearch),
      element: e,
      score: -1,
    })) as ElementSearchResult[];
  }

  /**
   * Finds matches of the search terms in an element name, markdown, and tags.
   *
   * @param element Element to search in.
   * @param splittedTextSearch Search terms.
   * @returns Matches of the search terms in the element.
   */
  private findSearchResultMatchesInElement(
    element: Element & { tags: Array<{ tag: { name: string } }> },
    splittedTextSearch: string[],
  ) {
    if (!splittedTextSearch.length) {
      return [];
    }

    const regex = new RegExp(splittedTextSearch.join('|'), 'gi');

    const matches: ElementSearchMatch[] = [
      ...(element.name.match(regex)?.map((m) => ({
        key: 'name',
        value: m,
      })) ?? []),
      ...(element.markdown?.match(regex)?.map((m) => ({
        key: 'markdown',
        value: m,
      })) ?? []),
      ...(element.tags
        .map((t) => t.tag.name)
        .join(' ')
        .match(regex)
        ?.map((m) => ({
          key: 'tags',
          value: m,
        })) ?? []),
    ];

    return matches;
  }

  /**
   * Searches for elements with a given text.
   *
   * @param userRequestId User ID of the requesting user.
   * @param elementSearchInput Search input.
   * @param paginationArgs Pagination arguments.
   * @param splittedTextSearch Sanitized and prepared Search terms.
   * @returns Elements that match the search terms.
   */
  private async searchElementsWithText(
    userRequestId: string | undefined,
    elementSearchInput: ElementSearchInput,
    paginationArgs: PaginationArgs,
    splittedTextSearch: string[],
  ) {
    const searchElementsQueryWhereInput =
      await this.getElementsForSearchWhereInput(
        userRequestId,
        elementSearchInput,
      );

    const sharedProperties = {
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
    } as const;

    const elementsByName = await this.prismaService.element.findMany({
      where: {
        ...searchElementsQueryWhereInput,
        OR: splittedTextSearch.map((searchTerm) => ({
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      },
      take: paginationArgs.take,
      skip: paginationArgs.skip,
      ...sharedProperties,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const elementsByNameCount = elementsByName.length;
    this.logger.debug('Found elements by name: ' + elementsByNameCount);

    let elementsByTag: (typeof elementsByName)[0][] = [];
    if (elementsByNameCount < paginationArgs.take) {
      this.logger.debug(`Searching for elements with matching tags`);
      elementsByTag = await this.prismaService.element.findMany({
        where: {
          ...searchElementsQueryWhereInput,
          tags: {
            some: {
              OR: splittedTextSearch.map((searchTerm) => ({
                tag: {
                  name: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
              })),
            },
          },
        },
        take: Math.max(0, paginationArgs.take - elementsByNameCount),
        skip: Math.max(0, paginationArgs.skip - elementsByNameCount),
        ...sharedProperties,
      });
      this.logger.debug('Found elements by tag: ' + elementsByTag.length);
    }

    const allElements = [...elementsByName, ...elementsByTag];

    return allElements;
  }

  /**
   * Returns a Prisma query object that can be used to filter elements for a search.
   *
   * @param userRequestId Id of the requesting user.
   * @param input Search input.
   * @returns Prisma query object.
   */
  private async getElementsForSearchWhereInput(
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
      : input.languageCodes ?? user?.languageCodes ?? [FALLBACK_LANGUAGE_CODE];

    const accessibleElementsQuery: Prisma.ElementWhereInput = {
      AND: [
        accessibleBy(ability, ABILITY_ACTION_LIST).Element,
        noSnapshotElementFilterQuery,
        elementLanguageFilterQuery(userRequestId, languageCodes),
      ],
    };

    return accessibleElementsQuery;
  }

  /**
   * Fetches elements for an empty search.
   *
   * This function is used when the search input is empty. It fetches elements
   * that are accessible by the user and returns them.
   *
   * @param userRequestId Id of the requesting user.
   */
  private async fetchElementsForEmptySearch(
    userRequestId: string | undefined,
    elementSearchInput: ElementSearchInput,
    paginationArgs: PaginationArgs,
  ) {
    const searchElementsQueryWhereInput =
      await this.getElementsForSearchWhereInput(
        userRequestId,
        elementSearchInput,
      );

    const result = this.prismaService.element.findMany({
      where: {
        ...searchElementsQueryWhereInput,
      },
      take: paginationArgs.take,
      skip: paginationArgs.skip,
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return result;
  }
}
