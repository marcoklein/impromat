import { Injectable } from '@nestjs/common';
import { Prisma, Element as PrismaElement } from '@prisma/client';
import Fuse from 'fuse.js';
import { UserElementsFilterInput } from 'src/dtos/inputs/user-elements-filter-input';
import { ElementSearchMatch } from 'src/dtos/types/element-search-result.dto';
import { User } from 'src/dtos/types/user.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserElementsService {
  constructor(private prismaService: PrismaService) {}

  async searchElements(
    userSessionId: string | undefined,
    user: User,
    filterInput: UserElementsFilterInput,
    pagination: { skip: number; take: number },
  ): Promise<
    {
      element: PrismaElement;
      score: number;
      matches: ElementSearchMatch[];
    }[]
  > {
    const { liked, owned, searchText, public: isPublic } = filterInput;
    if (userSessionId === undefined || userSessionId !== user.id)
      throw new Error('Filtering for other user not implemented yet');

    const publicFilter: Prisma.ElementWhereInput = { visibility: 'PUBLIC' };
    const ownedFilter: Prisma.ElementWhereInput = { ownerId: user.id };
    const likedFilter: Prisma.ElementWhereInput = {
      userFavoriteElement: { some: { userId: user.id } },
    };
    const filter: Prisma.ElementWhereInput = {
      OR: [
        owned ? ownedFilter : {},
        liked ? likedFilter : {},
        isPublic ? publicFilter : {},
      ],
    };
    const elementsToSearch = await this.prismaService.element.findMany({
      where: filter,
      orderBy: {
        updatedAt: 'desc',
      },
      include: { tags: true },
    });

    if (!searchText) {
      return elementsToSearch
        .map((element) => ({
          element,
          score: 1,
          matches: [],
        }))
        .slice(pagination.skip, pagination.skip + pagination.take);
    }
    const fuse = new Fuse(elementsToSearch, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'tags.name', weight: 1 },
      ],
      includeScore: true,
      includeMatches: true,
      shouldSort: true,
      threshold: 0.5,
    });

    // TODO optimize by reusing fuse instance for public elements and potentially cache search index for users
    const result = fuse
      .search(searchText, {
        limit: pagination.skip + pagination.take,
      })
      .slice(pagination.skip, pagination.skip + pagination.take)
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
