import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ElementTagsFilterInput } from 'src/dtos/inputs/element-tags-filter-input';
import { Nullable } from 'src/utils/nullish';
import { PrismaService } from './prisma.service';

@Injectable()
export class ElementTagService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findAvailableTags(
    filter: Nullable<ElementTagsFilterInput>,
    pagination: { skip: number; take: number },
    userSessionId: Nullable<string>,
  ) {
    const userFilter: Prisma.ElementTagWhereInput = {
      elements: {
        some: {
          ownerId: userSessionId,
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
              userSessionId ? userFilter : {},
              {
                elements: {
                  some: {
                    visibility: 'PUBLIC',
                  },
                },
              },
            ],
          },
        ],
      },
      orderBy: {
        elements: { _count: 'desc' },
      },
      skip: pagination.skip,
      take: pagination.take,
    });
  }
}
