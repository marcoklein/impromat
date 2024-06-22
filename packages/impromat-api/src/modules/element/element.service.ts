import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { PrismaService } from '../database/prisma.service';

import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import {
  Element,
  ElementMetadata,
  ElementTag,
  ElementToElementTag,
  ElementVisibility,
  Prisma,
} from '@prisma/client';
import { randomUUID } from 'node:crypto';
import {
  ElementsFilterInput,
  ElementsOrderByInput,
} from 'src/dtos/inputs/elements-query-input';
import { Element as ElementDto } from 'src/dtos/types/element.dto';
import {
  ABILITY_ACTION_LIST,
  ABILITY_ACTION_READ,
  ABILITY_ACTION_WRITE,
  defineAbilityForUser,
} from '../../graphql/abilities';
import { UserService } from '../user/user.service';
import { transformTagNames } from './element-tag-mappings';

const IMPROMAT_SOURCE_NAME = 'impromat';

@Injectable()
export class ElementService {
  private readonly logger = new Logger(ElementService.name);

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
  async findElementById(userRequestId: string | undefined, id: string) {
    const ability = defineAbilityForUser(userRequestId);
    return this.prismaService.element.findUniqueOrThrow({
      where: {
        AND: accessibleBy(ability).Element,
        id,
      },
    });
  }

  async findElementTags(element: ElementDto, userRequestId?: string) {
    const ability = defineAbilityForUser(userRequestId);
    const tags = await this.prismaService.element
      .findUnique({
        where: { id: element.id },
      })
      .tags({
        where: accessibleBy(ability).ElementToElementTag,
        include: { tag: true },
      });
    return tags?.map((tag) => tag.tag);
  }

  findElementOwner(userRequestId: string | undefined, elementId: string) {
    const ability = defineAbilityForUser(userRequestId);
    if (!userRequestId) return null;
    return this.prismaService.element
      .findUnique({
        where: { AND: accessibleBy(ability).Element, id: elementId },
      })
      .owner();
  }

  async findIsFavorite(element: ElementDto, userRequestId?: string) {
    if (!userRequestId) return false;
    const elementFavoriteRelations = await this.prismaService.element
      .findUnique({
        where: { id: element.id },
      })
      .userFavoriteElement({
        where: {
          userId: userRequestId,
        },
      });
    if (!elementFavoriteRelations) return false;
    return elementFavoriteRelations?.length > 0;
  }

  async findUsedByWorkshopElements(
    element: ElementDto,
    userRequestId?: string,
  ) {
    const ability = defineAbilityForUser(userRequestId);
    return this.prismaService.element
      .findUnique({ where: { id: element.id } })
      .workshopElements({
        where: accessibleBy(ability).WorkshopElement,
      });
  }

  async findIsOwnerMe(userRequestId: string | undefined, elementId: string) {
    const owner = await this.findElementOwner(userRequestId, elementId);
    return owner?.id === userRequestId;
  }

  async findElements(
    userRequestId: string | undefined,
    input: {
      // TODO Query elements is not called anywhere, thus refactor to a function that takes in the `where` statement
      filter?: ElementsFilterInput;
      orderBy: ElementsOrderByInput;
      skip: number;
      take: number;
    },
  ) {
    const { filter, take, skip } = input;

    const user = userRequestId
      ? await this.userService.findUserById(userRequestId, userRequestId)
      : undefined;

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
          user && user.languageCodes && user.languageCodes.length > 0
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
      include: { tags: { include: { tag: true } } },
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
    if (!userRequestId || ability.cannot('write', 'Element')) {
      throw new Error('Unauthorized');
    }

    if (createElementInput.setPredictedLevelTags) {
      throw new Error('setPredictedLevelTags not implemented yet');
    }

    const tagsSetQuery = this.transformTags(
      createElementInput.tags?.set.flatMap((tag) => tag.name) ?? [],
      createElementInput.languageCode,
    );

    const createdElementId = randomUUID();
    const createElementQuery = this.prismaService.element.create({
      data: {
        ...createElementInput,
        id: createdElementId,
        tags: undefined,
        sourceName: createElementInput.sourceName ?? IMPROMAT_SOURCE_NAME,
        ownerId: userRequestId,
      },
    });

    const createTagsQueries = tagsSetQuery.map((tagName) =>
      this.prismaService.elementToElementTag.create({
        data: {
          element: { connect: { id: createdElementId } },
          tag: {
            connectOrCreate: {
              create: { name: tagName },
              where: { name: tagName },
            },
          },
        },
      }),
    );

    const [createResult] = await this.prismaService.$transaction([
      createElementQuery,
      ...createTagsQueries,
    ]);
    return createResult;
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
    if (!userRequestId || ability.cannot('write', 'Element')) {
      throw new Error('Unauthorized');
    }
    const existingElement = await this.prismaService.element.findFirst({
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
        tags: { include: { tag: true } },
        metadata: true,
      },
    });

    if (!existingElement)
      throw new Error('Not existing or insufficient read rights.');

    if (
      existingElement.visibility === 'PUBLIC' &&
      updateElementInput.visibility === 'PRIVATE'
    ) {
      throw new Error('Cannot change visibility to private.');
    }

    if (
      !ability.can(ABILITY_ACTION_WRITE, subject('Element', existingElement))
    ) {
      throw new Error('Write not permitted.');
    }

    const languageCode =
      updateElementInput.languageCode ??
      existingElement.languageCode ??
      undefined;

    const transformedTagNames = this.transformTags(
      [...(updateElementInput.tags?.set.flatMap((tag) => tag.name) ?? [])],
      languageCode ?? existingElement.languageCode ?? undefined,
    );

    delete updateElementInput.setPredictedLevelTags;

    const fieldsHaveChanged =
      (updateElementInput.name !== undefined &&
        updateElementInput.name !== existingElement.name) ||
      (updateElementInput.markdown !== undefined &&
        updateElementInput.markdown !== existingElement.markdown) ||
      (updateElementInput.languageCode !== undefined &&
        updateElementInput.languageCode !== existingElement.languageCode) ||
      (updateElementInput.sourceName !== undefined &&
        updateElementInput.sourceName !== existingElement.sourceName) ||
      (updateElementInput.sourceUrl !== undefined &&
        updateElementInput.sourceUrl !== existingElement.sourceUrl) ||
      (updateElementInput.sourceBaseUrl !== undefined &&
        updateElementInput.sourceBaseUrl !== existingElement.sourceBaseUrl) ||
      (updateElementInput.licenseName !== undefined &&
        updateElementInput.licenseName !== existingElement.licenseName) ||
      (updateElementInput.licenseUrl !== undefined &&
        updateElementInput.licenseUrl !== existingElement.licenseUrl) ||
      (updateElementInput.visibility !== undefined &&
        updateElementInput.visibility !== existingElement.visibility);

    function twoListsAreEqual(list1: string[], list2: string[]) {
      if (list1.length !== list2.length) return false;
      for (const item of list1) {
        if (!list2.includes(item)) return false;
      }
      return true;
    }
    const tagsHaveChanged = !twoListsAreEqual(
      existingElement.tags.map((result) => result.tag.name),
      transformedTagNames,
    );

    if (!fieldsHaveChanged && !tagsHaveChanged) {
      return existingElement;
    }

    const createElementSnapshotQueries = this.createSnapshotQuery(
      userRequestId,
      existingElement,
    );
    const updateElementQuery = this.prismaService.element.update({
      where: { id: updateElementInput.id },
      data: {
        ...updateElementInput,
        version: {
          // TODO filter for optimistic concurrency control exception
          // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#optimistic-concurrency-control-on-updates
          increment: 1,
        },
        metadata: {
          connect: existingElement.metadata?.map((metadata) => ({
            id: metadata.id,
          })),
        },
        tags: undefined,
      },
    });
    const existingElementTagNames = existingElement.tags.map(
      ({ tag }) => tag.name,
    );
    const deletedTagNames = existingElementTagNames.filter(
      (existingTagName) => !transformedTagNames.includes(existingTagName),
    );
    const createdTagNames = transformedTagNames.filter(
      (transformedTagName) =>
        !existingElementTagNames.includes(transformedTagName),
    );

    const deleteElementTagsQuery =
      this.prismaService.elementToElementTag.deleteMany({
        where: {
          elementId: updateElementInput.id,
          tag: { name: { in: deletedTagNames } },
        },
      });

    const createElementTagsQuery = this.prismaService.elementTag.createMany({
      data: createdTagNames.map((tagName) => ({ name: tagName })),
      skipDuplicates: true,
    });

    const createElementToElementTagQueries = createdTagNames.map((tagName) =>
      this.prismaService.elementToElementTag.create({
        data: {
          element: {
            connect: { id: updateElementInput.id },
          },
          tag: {
            connect: {
              name: tagName,
            },
          },
        },
      }),
    );
    console.log('create query', createElementToElementTagQueries);

    console.log({
      element: {
        connect: { id: updateElementInput.id },
      },
      tag: {
        connect: {
          name: createdTagNames.at(0),
        },
      },
    });

    const [updateResult] = await this.prismaService.$transaction([
      updateElementQuery,
      deleteElementTagsQuery,
      createElementTagsQuery,
      ...createElementToElementTagQueries,
      ...createElementSnapshotQueries,
    ]);

    return updateResult;
  }

  private transformTags(tagNames: string[], languageCode: string | undefined) {
    const transformedTags = tagNames.flatMap(
      (tagName) =>
        transformTagNames([tagName], languageCode)?.tags ?? [tagName],
    );
    const uniqueTags = [...new Set(transformedTags)];
    return uniqueTags;
  }

  private createSnapshotQuery(
    userRequestId: string | undefined,
    existing: Element & {
      metadata: ElementMetadata[];
      tags: (ElementToElementTag & { tag: ElementTag })[];
    },
  ) {
    const snapshotElementId = randomUUID();
    const createElementQuery = this.prismaService.element.create({
      data: {
        ...existing,
        ...{
          snapshotParentId: existing.id,
          snapshotUserId: userRequestId,
          id: snapshotElementId,
          updatedAt: undefined,
          createdAt: undefined,
          improbibIdentifier: undefined,
          metadata: {
            // TODO clone metadata?
            connect: existing.metadata?.map((metadata) => ({
              id: metadata.id,
            })),
          },
          tags: undefined,
        },
      },
    });

    const elementToElementTagQueries = existing.tags.map((existingTag) =>
      this.prismaService.elementToElementTag.create({
        data: {
          // TODO copy createdAt and updatedAt
          element: { connect: { id: snapshotElementId } },
          tag: { connect: { name: existingTag.tag.name } },
        },
      }),
    );
    return [createElementQuery, ...elementToElementTagQueries];
  }
}
