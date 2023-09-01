import { Inject, Injectable } from '@nestjs/common';
import {
  CreateElementInput,
  ElementTagsInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { PrismaService } from './prisma.service';

import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import {
  Element,
  ElementMetadata,
  ElementTag,
  ElementVisibility,
  Prisma,
} from '@prisma/client';
import { ElementsOrderByInput } from 'src/dtos/inputs/elements-query-input';
import { ElementPredictedTag } from 'src/dtos/types/element-predicted-tag.dto';
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
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private elementAiService: ElementAIService,
    // private elementTagService: ElementTagService,
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
        tags: true,
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
      tags: element.tags.map((tag) => tag.name),
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

    const tagsSetQuery = this.createTagsSetQuery(
      createElementInput.tags,
      createElementInput.languageCode,
      undefined,
    );

    return this.prismaService.element.create({
      data: {
        ...createElementInput,
        tags: {
          connectOrCreate: tagsSetQuery?.map((tag) => ({
            create: { name: tag.name },
            where: { name: tag.name },
          })),
        },
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
    if (!userRequestId || ability.cannot('write', 'Element')) {
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
        metadata: true,
      },
    });
    if (!existing) throw new Error('Not existing or insufficient read rights.');

    if (
      existing.visibility === 'PUBLIC' &&
      updateElementInput.visibility === 'PRIVATE'
    ) {
      throw new Error('Cannot change visibility to private.');
    }

    if (!ability.can(ABILITY_ACTION_WRITE, subject('Element', existing))) {
      throw new Error('Write not permitted.');
    }

    const predictedTagsConnectOrCreate = await this.createPredictedTagsQuery(
      userRequestId,
      updateElementInput.setPredictedLevelTags ?? false,
      updateElementInput.id,
    );
    const languageCode =
      updateElementInput.languageCode ?? existing.languageCode ?? undefined;
    const tagsSetQuery = this.createTagsSetQuery(
      updateElementInput.tags,
      languageCode,
      existing,
    );

    delete updateElementInput.setPredictedLevelTags;

    const fieldsHaveChanged =
      (updateElementInput.name !== undefined &&
        updateElementInput.name !== existing.name) ||
      (updateElementInput.markdown !== undefined &&
        updateElementInput.markdown !== existing.markdown) ||
      (updateElementInput.languageCode !== undefined &&
        updateElementInput.languageCode !== existing.languageCode) ||
      (updateElementInput.sourceName !== undefined &&
        updateElementInput.sourceName !== existing.sourceName) ||
      (updateElementInput.sourceUrl !== undefined &&
        updateElementInput.sourceUrl !== existing.sourceUrl) ||
      (updateElementInput.sourceBaseUrl !== undefined &&
        updateElementInput.sourceBaseUrl !== existing.sourceBaseUrl) ||
      (updateElementInput.licenseName !== undefined &&
        updateElementInput.licenseName !== existing.licenseName) ||
      (updateElementInput.licenseUrl !== undefined &&
        updateElementInput.licenseUrl !== existing.licenseUrl) ||
      (updateElementInput.visibility !== undefined &&
        updateElementInput.visibility !== existing.visibility);

    const tagsHaveChanged =
      tagsSetQuery?.length !== existing.tags?.length ||
      tagsSetQuery?.some(
        (tag) =>
          !existing.tags?.some((existingTag) => existingTag.name === tag.name),
      );

    if (!fieldsHaveChanged && !tagsHaveChanged) {
      return existing;
    }

    const saveSnapshotQuery = this.createSnapshotQuery(userRequestId, existing);
    const updateElementQuery = this.prismaService.element.update({
      where: { id: updateElementInput.id },
      data: {
        ...updateElementInput,
        ...{
          metadata: {
            connect: existing.metadata?.map((metadata) => ({
              id: metadata.id,
            })),
          },
          tags: {
            set: [], // ensure tags are removed, so connectOrCreate creates missing tags
            connectOrCreate: [
              ...(tagsSetQuery?.map((tag) => ({
                create: { name: tag.name },
                where: { name: tag.name },
              })) ?? []),
              ...predictedTagsConnectOrCreate,
            ],
          },
        },
      },
    });

    const [, updateResult] = await this.prismaService.$transaction([
      saveSnapshotQuery,
      updateElementQuery,
    ]);

    return updateResult;
  }

  /**
   * TODO make method more generic to support element creation (e.g. extract cache layer)
   *
   * @param userRequestId
   * @param setPredictedLevelTags
   * @param elementId
   * @returns
   */
  private async createPredictedTagsQuery(
    userRequestId: string,
    setPredictedLevelTags: boolean,
    elementId: string,
  ) {
    let predictedTagsConnectOrCreate: Prisma.ElementTagCreateOrConnectWithoutElementsInput[] =
      [];
    console.log('set predicted level tags', setPredictedLevelTags);
    if (setPredictedLevelTags) {
      const predictedLevelTags = await this.findPredictedLevelTags(
        userRequestId,
        elementId,
      );
      console.log('predicted level tags:', predictedLevelTags);
      if (predictedLevelTags) {
        predictedTagsConnectOrCreate = predictedLevelTags.map((tag) => ({
          create: { name: tag.name },
          where: { name: tag.name },
        }));
        console.log(
          'setting predicted level tags',
          predictedTagsConnectOrCreate,
        );
      }
    }
    return predictedTagsConnectOrCreate;
  }

  private createTagsSetQuery(
    elementTagsInput: ElementTagsInput | undefined,
    inputLanguageCode: string | undefined,
    existing: (Element & { tags: ElementTag[] }) | undefined,
  ) {
    if (elementTagsInput === undefined) return undefined;
    const languageCode =
      inputLanguageCode ?? existing?.languageCode ?? undefined;
    const tagNames = elementTagsInput.set.map((tag) => tag.name);
    const tagsSetQuery = tagNames
      .flatMap(
        (tagName) =>
          transformTagNames([tagName], languageCode)?.tags ?? [tagName],
      )
      .map((tagName) => ({ name: tagName }));
    return tagsSetQuery;
  }

  private createSnapshotQuery(
    userRequestId: string | undefined,
    existing: Element & { metadata: ElementMetadata[]; tags: ElementTag[] },
  ) {
    return this.prismaService.element.create({
      data: {
        ...existing,
        ...{
          snapshotParentId: existing.id,
          snapshotUserId: userRequestId,
          id: undefined,
          updatedAt: undefined,
          createdAt: undefined,
          improbibIdentifier: undefined,
          metadata: {
            // TODO clone metadata?
            connect: existing.metadata?.map((metadata) => ({
              id: metadata.id,
            })),
          },
          tags: {
            connect: existing.tags.map((existingTag) => ({
              id: existingTag.id,
            })),
          },
        },
      },
    });
  }
}
