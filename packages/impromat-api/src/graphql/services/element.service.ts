import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { PrismaService } from './prisma.service';

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
import { ElementsOrderByInput } from 'src/dtos/inputs/elements-query-input';
import { ElementPredictedTag } from 'src/dtos/types/element-predicted-tag.dto';
import { ElementSummaryService } from 'src/modules/element-summary/element-summary.service';
import { ElementsFilterInput } from 'test/graphql-client/graphql';
import {
  ABILITY_ACTION_LIST,
  ABILITY_ACTION_READ,
  ABILITY_ACTION_WRITE,
  defineAbilityForUser,
} from '../abilities';
import { ElementAIService } from './element-ai.service';
import { transformTagNames } from './element-tag-mappings';
import { UserService } from './user.service';

const IMPROMAT_SOURCE_NAME = 'impromat';

@Injectable()
export class ElementService {
  private readonly logger = new Logger(ElementService.name);

  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private elementSummaryService: ElementSummaryService,
    private elementAiService: ElementAIService,
    private userService: UserService,
  ) {}

  async findPredictedLevelTags(
    userRequestId: string | undefined,
    elementId: string,
  ): Promise<ElementPredictedTag[] | undefined> {
    // TODO create more fine grained permission for running the AI prediction
    const ability = defineAbilityForUser(userRequestId);
    const element = await this.prismaService.element.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Element, { id: elementId }],
      },
      include: {
        tags: { include: { tag: true } },
        metadata: {
          where: { name: 'predictedLevelTags' },
          take: 1,
          orderBy: { updatedAt: 'desc' },
        },
      },
    });

    const metadata = element.metadata[0];
    if (metadata) {
      const value = metadata.value as {
        prompt: string;
        tags: { name: string; reason: string }[];
      };
      return value.tags;
    }

    const predictedTags = await this.elementAiService.predictLevelTags({
      id: element.id,
      languageCode: element.languageCode ?? '',
      markdown: element.markdown ?? '',
      name: element.name,
      tags: element.tags.map((result) => result.tag.name),
    });
    if (predictedTags) {
      await this.prismaService.elementMetadata.create({
        data: {
          elementId: element.id,
          name: 'predictedLevelTags',
          value: {
            prompt: predictedTags.prompt,
            message: predictedTags.message,
            tags: predictedTags.tags,
          },
        },
      });
    }
    return predictedTags?.tags;
  }

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

  async findElementTags(userRequestId: string | undefined, id: string) {
    const ability = defineAbilityForUser(userRequestId);
    const result = await this.prismaService.element.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Element, { id }],
      },
      select: {
        tags: { include: { tag: true } },
      },
    });
    return result.tags.map((relation) => relation.tag);
  }

  async findElementOwner(userRequestId: string | undefined, id: string) {
    if (!userRequestId) return null;
    const ability = defineAbilityForUser(userRequestId);
    const result = await this.prismaService.element.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Element, { id }],
      },
      select: {
        owner: true,
      },
    });
    return result.owner;
  }

  async generateElementSummaries(userSessionId: string | undefined) {
    const ability = defineAbilityForUser(userSessionId);
    const elementsWithoutSummary = await this.prismaService.element.findMany({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_LIST).Element,
          {
            snapshotParentId: null,
          },
          {
            summary: null,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        markdown: true,
        languageCode: true,
      },
    });
    this.logger.log(
      `Found ${elementsWithoutSummary.length} elements without summary.`,
    );
    for (const element of elementsWithoutSummary) {
      this.logger.debug(
        `Creating summary for element ${element.id} (${element.name}))`,
      );
      await this.getElementSummary(userSessionId, element.id);
    }
    return elementsWithoutSummary.length;
  }

  async getElementSummary(
    userSessionId: string | undefined,
    elementId: string,
    forceRefresh = false,
  ) {
    const dbElement = await this.findElementById(userSessionId, elementId);
    if (dbElement.summary && !forceRefresh) {
      return dbElement.summary;
    }
    if (!dbElement.markdown) {
      return '';
    }

    // TODO return immediately and dispatch summary creation in background
    void this.elementSummaryService
      .createSummary({
        elementId: dbElement.id,
        name: dbElement.name,
        markdown: dbElement.markdown ?? '',
        languageCode: dbElement.languageCode ?? 'en',
      })
      .then((summary) => {
        this.logger.debug('Updating summary for element %s', dbElement.id);
        return this.prismaService.element.update({
          where: { id: dbElement.id },
          data: {
            summary,
          },
        });
      });

    return undefined;
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

    const user = await this.userService.findUserById(
      userRequestId,
      userRequestId,
    );
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

    const predictedLevelTags = updateElementInput.setPredictedLevelTags
      ? await this.findPredictedLevelTags(userRequestId, updateElementInput.id)
      : [];
    const languageCode =
      updateElementInput.languageCode ??
      existingElement.languageCode ??
      undefined;

    const transformedTagNames = this.transformTags(
      [
        ...(updateElementInput.tags?.set.flatMap((tag) => tag.name) ?? []),
        ...(predictedLevelTags?.map((tag) => tag.name) ?? []),
      ],
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
