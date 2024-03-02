import { accessibleBy } from '@casl/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from 'prisma/prisma-client';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import { Element } from 'src/dtos/types/element.dto';
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
  ): Promise<ElementSearchResult[]> {
    const searchElementsQueryWhereInput =
      await this.getElementsForSearchWhereInput(
        userRequestId,
        elementSearchInput,
      );

    const OR_SEPARATOR = '|'; // TODO make this configurable?
    const preparedTextSearch = (elementSearchInput.text?.trim() ?? '')
      .replaceAll(
        // replace all spaces with a single space
        / +/g,
        ' ',
      )
      .replaceAll(' ', OR_SEPARATOR);

    const elementsByName = await this.prismaService.element.findMany({
      where: {
        ...searchElementsQueryWhereInput,
        OR: [
          {
            name: {
              search: preparedTextSearch,
            },
          },
          {
            markdown: {
              // search: preparedTextSearch,
              contains: preparedTextSearch,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              some: {
                tag: {
                  name: {
                    search: preparedTextSearch,
                  },
                },
              },
            },
          },
        ],
      },
      orderBy: [
        {
          _relevance: {
            fields: 'name',
            search: preparedTextSearch,
            sort: 'desc',
          },
        },
        {
          updatedAt: 'desc',
        },
      ],
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      take: paginationArgs.take,
      skip: paginationArgs.skip,
    });

    function findMatches(e: (typeof elementsByName)[0]) {
      const postgresQueryToRegex = (query: string) =>
        query.replaceAll(OR_SEPARATOR, '|');

      const regex = new RegExp(postgresQueryToRegex(preparedTextSearch), 'gi');

      const matches: ElementSearchMatch[] = [
        ...(e.name.match(regex)?.map((m) => ({
          key: 'name',
          value: m,
        })) ?? []),
        ...(e.markdown?.match(regex)?.map((m) => ({
          key: 'markdown',
          value: m,
        })) ?? []),
        ...(e.tags
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

    return elementsByName.map((e) => ({
      matches: findMatches(e),
      element: e as unknown as Element,
      score: -1,
    }));
  }

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
}
