import { Inject, Injectable } from '@nestjs/common';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { PrismaService } from './prisma.service';

import { accessibleBy } from '@casl/prisma';
import { ElementVisibility, Prisma } from '@prisma/client';
import { ElementsOrderByInput } from 'src/dtos/inputs/elements-query-input';
import { ElementsFilterInput } from 'test/graphql-client/graphql';
import {
  ABILITY_ACTION_LIST,
  ABILITY_ACTION_READ,
  ABILITY_ACTION_WRITE,
  defineAbilityForUser,
} from '../abilities';
import { subject } from '@casl/ability';

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

  findElementsFromUser(
    userRequestId: string,
    input: {
      filter: ElementsFilterInput;
      orderBy: ElementsOrderByInput;
      skip: number;
      take: number;
    },
  ) {
    const { filter, take, skip } = input;

    const whereInput: Prisma.ElementWhereInput[] = [];

    if (filter?.isOwnerMe) {
      whereInput.push({ ownerId: userRequestId });
    }
    if (filter?.isPublic) {
      whereInput.push({ visibility: 'PUBLIC' });
    }

    const ability = defineAbilityForUser(userRequestId);

    return this.prismaService.element.findMany({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_LIST).Element,
          {
            snapshotParentId: null,
          },
          {
            OR: whereInput,
          },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
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
    const ability = defineAbilityForUser(userRequestId);
    const existing = await this.prismaService.element.findFirst({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_READ).Element,
          { id: updateElementInput.id },
          {
            OR: [
              { ownerId: userRequestId },
              { visibility: ElementVisibility.PUBLIC },
            ],
          },
        ],
      },
      include: {
        tags: true,
      },
    });
    if (!existing) throw new Error('Not existing or insufficient read rights.');

    if (!ability.can(ABILITY_ACTION_WRITE, subject('Element', existing))) {
      throw new Error('Write not permitted.');
    }

    if (
      existing.visibility === 'PUBLIC' &&
      updateElementInput.visibility === 'PRIVATE'
    ) {
      throw new Error('Cannot change visibility to private.');
    }

    const saveSnapshotQuery = this.prismaService.element.create({
      data: {
        ...existing,
        ...{
          snapshotParentId: existing.id,
          snapshotUserId: userRequestId,
          id: undefined,
          updatedAt: undefined,
          createdAt: undefined,
          improbibIdentifier: undefined,
          tags: {
            connect: existing.tags.map((existingTag) => ({
              id: existingTag.id,
            })),
          },
        },
      },
    });

    const updateElementQuery = this.prismaService.element.update({
      where: { id: updateElementInput.id },
      data: updateElementInput,
    });

    const [, updateResult] = await this.prismaService.$transaction([
      saveSnapshotQuery,
      updateElementQuery,
    ]);

    return updateResult;
  }
}
