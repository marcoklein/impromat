import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Element as PrismaElement } from '@prisma/client';
import Fuse from 'fuse.js';
import { ElementSearchInput } from 'src/dtos/inputs/element-search-input';
import { ElementSearchMatch } from 'src/dtos/types/element-search-result.dto';
import { ABILITY_ACTION_LIST, defineAbilityForUser } from '../abilities';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';

@Injectable()
export class ElementSearchService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async searchElements(
    userRequestId: string,
    searchElementsInput: ElementSearchInput,
  ): Promise<
    {
      element: PrismaElement;
      score: number;
      matches: ElementSearchMatch[];
    }[]
  > {
    const user = await this.userService.findUserById(
      userRequestId,
      userRequestId,
    );
    if (!user) throw new Error('User not found');

    const ability = defineAbilityForUser(userRequestId);

    const elementsToSearch = await this.prismaService.element.findMany({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_LIST).Element,
          {
            snapshotParentId: null,
          },
          user.languageCodes && user.languageCodes.length > 0
            ? {
                OR: [
                  {
                    languageCode: {
                      in: user.languageCodes,
                    },
                  },
                  {
                    languageCode: null,
                  },
                  // ignore language for owned requests and liked elements
                  {
                    ownerId: userRequestId,
                  },
                  {
                    userFavoriteElement: {
                      some: {
                        userId: userRequestId,
                      },
                    },
                  },
                ],
              }
            : {},
          {
            OR: [
              {
                ownerId: userRequestId,
              },
              {
                visibility: 'PUBLIC',
              },
            ],
          },
        ],
      },
      include: { tags: true },
    });

    if (!searchElementsInput.text) {
      return elementsToSearch
        .map((element) => ({
          element,
          score: 1,
          matches: [],
        }))
        .slice(
          searchElementsInput.skip,
          searchElementsInput.skip + searchElementsInput.take,
        );
    }
    const fuse = new Fuse(elementsToSearch, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'tags.name', weight: 1 },
      ],
      isCaseSensitive: false,
      includeScore: true,
      includeMatches: true,
      shouldSort: true,
      threshold: 0.6,
    });

    // TODO optimize by reusing fuse instance for public elements and potentially cache search index for users
    const result = fuse
      .search(searchElementsInput.text.trim(), {
        limit: searchElementsInput.skip + searchElementsInput.take,
      })
      .slice(
        searchElementsInput.skip,
        searchElementsInput.skip + searchElementsInput.take,
      )
      .map((fuseResult) => ({
        element: fuseResult.item,
        score: fuseResult.score ?? 1,
        matches:
          fuseResult.matches?.map(
            (match): ElementSearchMatch => ({
              indices: match.indices as [number, number][],
              key: match.key,
              refIndex: match.refIndex,
              value: match.value ?? '',
            }),
          ) ?? [],
      }));
    return result;
  }
}
