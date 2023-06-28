import { Inject, Injectable } from '@nestjs/common';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { PrismaService } from './prisma.service';

import { subject } from '@casl/ability';
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

const IMPROMAT_SOURCE_NAME = 'impromat';

@Injectable()
export class ElementService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  /**
   * Finds the Element with given id.
   *
   * @param userRequestId Request id of the authenticated user.
   * @param id Element id to find.
   * @returns Element with given id or throws if the element is not existing.
   */
  findElementById(userRequestId: string | undefined, id: string) {
    const ability = defineAbilityForUser(userRequestId);
    return this.prismaService.element.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Element, { id }],
      },
    });
  }

  findElements(
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

  /**
   * Creates a new element for the given user.
   *
   * @param userRequestId User id of authenticated user.
   * @param createElementInput Parameters of created element.
   * @returns Created element record.
   */
  async createElement(
    userRequestId: string | undefined,
    createElementInput: CreateElementInput,
  ) {
    const ability = defineAbilityForUser(userRequestId);
    if (ability.cannot('write', 'Element')) {
      throw new Error('Unauthorized');
    }
    return this.prismaService.element.create({
      data: {
        ...createElementInput,
        sourceName: IMPROMAT_SOURCE_NAME,
        ownerId: userRequestId,
      },
    });
  }

  /**
   * Updates the given element.
   *
   * @param userRequestId User id of authenticated user.
   * @param updateElementInput New element state.
   * @returns Updated element record.
   */
  async updateElement(
    userRequestId: string | undefined,
    updateElementInput: UpdateElementInput,
  ) {
    const ability = defineAbilityForUser(userRequestId);
    if (ability.cannot('write', 'Element')) {
      throw new Error('Unauthorized');
    }
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
