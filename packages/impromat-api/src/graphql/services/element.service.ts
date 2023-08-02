import { Inject, Injectable } from '@nestjs/common';
import {
  CreateElementInput,
  ElementTagsInput,
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
import { UserService } from './user.service';

const IMPROMAT_SOURCE_NAME = 'impromat';

@Injectable()
export class ElementService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private userService: UserService,
  ) {}

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

  async findElements(
    userRequestId: string | undefined,
    input: {
      // TODO Query elements is not called anywhere, thus refactor to a function that takes in the `where` statement
      filter: ElementsFilterInput;
      orderBy: ElementsOrderByInput;
      skip: number;
      take: number;
    },
  ) {
    const { filter, take, skip } = input;

    const user = await this.userService.findUserById(userRequestId);
    if (!user) throw new Error('User not found');

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
          { OR: whereInput },
        ],
      },
      orderBy: [{ updatedAt: 'desc' }, { id: 'asc' }],
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

    const tagsQuery = this.getCreateTagsInputQuery(createElementInput?.tags);

    return this.prismaService.element.create({
      data: {
        ...createElementInput,
        tags: tagsQuery,
        sourceName: createElementInput.sourceName ?? IMPROMAT_SOURCE_NAME,
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
    if (updateElementInput.tags?.set) {
      throw new Error('Not implemented yet');
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

  private getCreateTagsInputQuery(
    elementTagsInput: ElementTagsInput | undefined,
  ):
    | Prisma.ElementTagUncheckedCreateNestedManyWithoutElementsInput
    | undefined {
    if (!elementTagsInput) return undefined;
    if (elementTagsInput.connect && elementTagsInput.set) {
      throw new Error('Specify either "connect" or "set" for tags input.');
    }
    if (elementTagsInput.connect) {
      return { connect: elementTagsInput.connect };
    }
    if (elementTagsInput.set) {
      const setInput = elementTagsInput.set;
      const connectOrCreate: Prisma.ElementTagCreateOrConnectWithoutElementsInput[] =
        [];
      const connect: Prisma.ElementTagWhereUniqueInput[] = [];
      for (const input of setInput) {
        if (input.name) {
          connectOrCreate.push({
            create: { name: input.name },
            where: { id: input.id, name: input.name },
          });
        } else if (input.id) {
          connect.push(input);
        } else {
          throw new Error('Name and id undefined');
        }
      }
      return {
        connectOrCreate,
        connect,
      };
    }
    return undefined;
  }
}
