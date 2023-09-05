import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { ElementTag, Prisma } from '@prisma/client';
import { ElementTagsFilterInput } from 'src/dtos/inputs/element-tags-filter-input';
import { Nullable } from 'src/utils/nullish';
import { defineAbilityForUser } from '../abilities';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { elementLanguageFilterQuery } from './shared-prisma-queries';

/**
 * Business logic for `ElementTags`.
 */
@Injectable()
export class ElementTagService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async findAvailableTags(
    userRequestId: string | undefined,
    filter: Nullable<ElementTagsFilterInput>,
    pagination: { skip: number; take: number },
  ) {
    const ability = defineAbilityForUser(userRequestId);

    if (filter?.text) {
      const userFilter: Prisma.ElementTagWhereInput = {
        elements: {
          some: {
            element: {
              ownerId: userRequestId,
            },
          },
        },
      };
      const textFilter: Prisma.ElementTagWhereInput = {
        name: { contains: filter?.text, mode: 'insensitive' },
      };
      return await this.prismaService.elementTag.findMany({
        where: {
          AND: [
            filter?.text ? textFilter : {},
            {
              OR: [
                userRequestId ? userFilter : {},
                {
                  elements: {
                    some: {
                      element: {
                        visibility: 'PUBLIC',
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        orderBy: [{ elements: { _count: 'desc' } }, { id: 'asc' }],
        skip: pagination.skip,
        take: pagination.take,
      });
    } else {
      const user = await this.userService.findUserById(
        userRequestId,
        userRequestId,
      );
      if (!user) throw new Error('User not found');
      const groupByResult =
        await this.prismaService.elementToElementTag.groupBy({
          by: ['tagId'],
          where: {
            AND: [
              accessibleBy(ability).ElementToElementTag,
              { element: { snapshotParentId: null } },
              user.languageCodes && user.languageCodes.length > 0
                ? {
                    element: elementLanguageFilterQuery(
                      user.id,
                      user.languageCodes,
                    ),
                  }
                : {},
              filter?.selectedTagNames && filter.selectedTagNames.length > 0
                ? {
                    tag: {
                      name: {
                        notIn: filter.selectedTagNames,
                      },
                    },
                    element: {
                      AND: filter.selectedTagNames.map((tagName) => ({
                        tags: {
                          some: {
                            tag: {
                              name: tagName,
                            },
                          },
                        },
                      })),
                    },
                  }
                : {},
            ],
          },
          having: {
            tagId: {
              _count: {
                // only return relevant tags if there were no tags selected yet
                gt: filter?.selectedTagNames?.length ? 1 : 8,
              },
            },
          },
          orderBy: [
            {
              _count: {
                tagId: 'desc',
              },
            },
            { tagId: 'asc' },
          ],
          _count: {
            tagId: true,
          },
          take: pagination.take,
          skip: pagination.skip,
        });

      const fetchedElementTags: ElementTag[] = [];
      for (const result of groupByResult) {
        const elementTag =
          await this.prismaService.elementTag.findUniqueOrThrow({
            where: {
              id: result.tagId,
            },
          });
        if (elementTag) {
          fetchedElementTags.push(elementTag);
        }
      }

      return fetchedElementTags;
    }
  }
}
