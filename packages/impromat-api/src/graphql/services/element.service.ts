import { Inject, Injectable } from '@nestjs/common';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { PrismaService } from './prisma.service';

import { Prisma } from '@prisma/client';
import { ElementsQueryInput } from 'src/dtos/inputs/elements-query-input';

const IMPROMAT_SOURCE_NAME = 'impromat';

@Injectable()
export class ElementService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  findElementById(userRequestId: string | undefined, id: string) {
    return this.prismaService.element.findFirstOrThrow({
      where: {
        OR: [
          userRequestId ? { ownerId: userRequestId, id } : {},
          { id, visibility: 'PUBLIC' },
          {
            id,
            workshopElements: {
              some: {
                workshopSection: {
                  workshop: {
                    isPublic: true,
                  },
                },
              },
            },
          },
        ],
      },
    });
  }

  findElementsFromUser(userRequestId: string, input: ElementsQueryInput) {
    const { filter, take, skip } = input;

    const whereInput: Prisma.ElementWhereInput[] = [];

    if (filter?.isOwnerMe) {
      whereInput.push({ ownerId: userRequestId });
    }
    if (filter?.isPublic) {
      whereInput.push({ visibility: 'PUBLIC' });
    }

    return this.prismaService.element.findMany({
      where: {
        OR: whereInput,
      },
      skip,
      take,
    });
  }

  async createElement(
    userRequestId: string,
    createElementInput: CreateElementInput,
  ) {
    const [, element] = await this.prismaService.$transaction([
      this.prismaService.user.findUniqueOrThrow({
        where: { id: userRequestId },
      }),
      this.prismaService.element.create({
        data: {
          ...createElementInput,
          sourceName: IMPROMAT_SOURCE_NAME,
          ownerId: userRequestId,
        },
      }),
    ]);
    return element;
  }

  async updateElement(
    userRequestId: string,
    updateElementInput: UpdateElementInput,
  ) {
    const existing = await this.prismaService.element.findFirstOrThrow({
      where: { id: updateElementInput.id, ownerId: userRequestId },
    });
    if (!existing) throw new Error('Not existing or not owner.');

    return this.prismaService.element.update({
      where: { id: updateElementInput.id },
      data: updateElementInput,
    });
  }
}
