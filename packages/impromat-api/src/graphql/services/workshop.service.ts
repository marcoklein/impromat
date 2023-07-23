import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateWorkshopItemOrder } from 'src/dtos/inputs/update-workshop-item-order';
import { UpdateWorkshopSectionInput } from 'src/dtos/inputs/workshop-section-input';
import {
  CreateWorkshopInput,
  UpdateWorkshopInput,
} from '../../dtos/inputs/workshop.inputs';
import { moveItemFromIndexToIndex } from './move-item-position';
import { PrismaService } from './prisma.service';
import { FindManyWorkshopsArgs } from 'src/dtos/args/find-many-workshops-args';
import {
  ABILITY_ACTION_LIST,
  ABILITY_ACTION_READ,
  defineAbilityForUser,
} from '../abilities';
import { accessibleBy } from '@casl/prisma';
import { DuplicateWorkshopInput } from 'src/dtos/inputs/duplicate-workshop-input';
import { randomUUID } from 'node:crypto';

@Injectable()
export class WorkshopService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  findWorkshopById(userSessionId: string | undefined, workshopId: string) {
    return this.prismaService.workshop.findFirst({
      where: this.findWorkshopByIdWhereQuery(userSessionId, workshopId),
    });
  }

  async findWorkshops(userSessionId: string, args: FindManyWorkshopsArgs) {
    const ability = defineAbilityForUser(userSessionId);
    return this.prismaService.workshop.findMany({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_LIST).Workshop,
          args.where ?? {},
        ],
      },
      orderBy: [...(args.orderBy ?? []), { id: 'asc' }],
      take: args.take,
      skip: args.skip,
    });
  }

  async deleteWorkshop(userSessionId: string, workshopId: string) {
    const existingWorkshop = await this.findWorkshopById(
      userSessionId,
      workshopId,
    );
    if (!existingWorkshop) {
      return null;
    }
    const result = await this.prismaService.workshop.delete({
      where: { id: workshopId },
    });
    return result;
  }

  async createWorkshop(
    sessionUserId: string,
    createWorkshopInput: CreateWorkshopInput,
  ) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: { id: sessionUserId },
    });
    const workshop = await this.prismaService.workshop.create({
      data: {
        ...createWorkshopInput,
        ownerId: user.id,
        sections: { create: [{ orderIndex: 0 }] },
      },
    });
    return workshop;
  }

  private updateSortedEntities(
    entities: { id?: string; orderIndex?: number }[],
    input?: {
      delete?: { id: string }[];
      update?: { id: string; orderIndex?: number }[];
      create?: { orderIndex?: number }[];
    },
  ) {
    if (!input) return;
    const withoutDeleted = entities.filter(
      (existingSection) =>
        !input.delete?.find((input) => input.id === existingSection.id),
    );
    const withUpdates = withoutDeleted.map((section) => {
      const updatedSection = input.update?.find(
        ({ id }) =>
          id !== undefined && section.id !== undefined && id === section.id,
      );
      if (updatedSection?.orderIndex !== undefined) {
        section.orderIndex = updatedSection.orderIndex;
      }
      return section;
    });
    const withCreated = withUpdates.concat(...(input.create ?? []));
    const sorted = withCreated.sort(
      (a, b) =>
        (a.orderIndex ?? Number.MAX_SAFE_INTEGER) -
        (b.orderIndex ?? Number.MAX_SAFE_INTEGER),
    );
    sorted.forEach((section, index) => {
      section.orderIndex = index;
    });
  }

  async updateWorkshop(
    sessionUserId: string,
    updateWorkshopInput: UpdateWorkshopInput,
  ) {
    const existingWorkshop = await this.prismaService.workshop.findFirstOrThrow(
      {
        where: { id: updateWorkshopInput.id, ownerId: sessionUserId },
        include: {
          sections: {
            include: {
              elements: true,
            },
          },
        },
      },
    );

    // TODO verify that inputs really belong to user

    this.updateSortedEntities(
      existingWorkshop.sections,
      updateWorkshopInput.sections,
    );

    const elementsDbQuery = (
      sectionDto: UpdateWorkshopSectionInput,
    ): Prisma.WorkshopElementUpdateManyWithoutWorkshopSectionNestedInput => {
      const existingElements =
        existingWorkshop.sections.find(
          (section) => section.id === sectionDto.id,
        )?.elements ?? [];

      this.updateSortedEntities(existingElements, sectionDto.elements);

      return {
        create: sectionDto.elements?.create,
        update: sectionDto.elements?.update?.map((element) => ({
          where: { id: element.id },
          data: element,
        })),
        delete: sectionDto.elements?.delete,
      };
    };

    const update:
      | Prisma.Enumerable<Prisma.WorkshopSectionUpdateWithWhereUniqueWithoutWorkshopInput>
      | undefined = updateWorkshopInput.sections?.update?.map((section) => ({
      where: { id: section.id },
      data: {
        ...section,
        ...{
          elements: elementsDbQuery(section),
        },
      },
    }));

    const create:
      | Prisma.Enumerable<Prisma.WorkshopSectionCreateWithoutWorkshopInput>
      | undefined = updateWorkshopInput.sections?.create?.map(
      (section) => section,
    );

    await this.prismaService.$transaction(async (tx) => {
      await tx.workshop.update({
        data: {
          ...updateWorkshopInput,
          ...{
            sections: {
              update,
              create,
              delete: updateWorkshopInput.sections?.delete,
            },
          },
        },
        where: {
          id: updateWorkshopInput.id,
        },
      });
      const sections = await tx.workshop
        .findUniqueOrThrow({
          where: { id: updateWorkshopInput.id },
        })
        .sections();
      if (!sections || !sections.length) {
        await tx.workshopSection.create({
          data: { workshopId: updateWorkshopInput.id },
        });
      }
    });
    return this.prismaService.workshop.findUniqueOrThrow({
      where: { id: updateWorkshopInput.id },
    });
  }

  async duplicateWorkshop(
    userSessionId: string | undefined,
    input: DuplicateWorkshopInput,
  ) {
    const { workshopId } = input;
    const existingWorkshop = await this.prismaService.workshop.findFirst({
      where: this.findWorkshopByIdWhereQuery(userSessionId, workshopId),
      include: {
        sections: {
          include: {
            elements: true,
          },
        },
      },
    });
    if (!existingWorkshop) {
      throw new Error('Workshop not found');
    }
    if (existingWorkshop.ownerId !== userSessionId) {
      throw new Error('Can only duplicate own workshops');
    }

    const newWorkshopId = randomUUID();
    const workshopCreate = this.prismaService.workshop.create({
      data: {
        ...existingWorkshop,
        ...{
          name: input.name,
          id: newWorkshopId,
          createdAt: undefined,
          updatedAt: undefined,
          version: undefined,
          isListed: false,
          isPublic: false,
          deleted: false,
          sections: undefined,
        },
      },
    });
    const prismaService = this.prismaService;
    const workshopElementsCreate: Array<
      ReturnType<typeof prismaService.workshopElement.create>
    > = [];
    const sectionsCreate: Array<
      ReturnType<typeof prismaService.workshopSection.create>
    > = [];

    for (const section of existingWorkshop.sections) {
      const sectionId = randomUUID();
      sectionsCreate.push(
        this.prismaService.workshopSection.create({
          data: {
            ...section,
            ...{
              id: sectionId,
              createdAt: undefined,
              updatedAt: undefined,
              deleted: false,
              deletedAt: undefined,
              isCollapsed: false,
              version: undefined,
              elements: undefined,
              workshop: undefined,
              workshopId: newWorkshopId,
            },
          },
        }),
      );
      for (const workshopElement of section.elements) {
        workshopElementsCreate.push(
          this.prismaService.workshopElement.create({
            data: {
              ...workshopElement,
              ...{
                id: undefined,
                createdAt: undefined,
                updatedAt: undefined,
                version: undefined,
                deleted: false,
                deletedAt: undefined,

                workshopSection: undefined,
                basedOn: undefined,
                workshopSectionId: sectionId,
                basedOnId: workshopElement.basedOnId,
              },
            },
          }),
        );
      }
    }

    const transactionResult = await this.prismaService.$transaction([
      workshopCreate,
      ...sectionsCreate,
      ...workshopElementsCreate,
    ]);
    return transactionResult[0];
  }

  async updateWorkshopItemOrder(
    userId: string,
    updateWorkshopItemOrder: UpdateWorkshopItemOrder,
  ) {
    const workshop = await this.prismaService.workshop.findFirstOrThrow({
      where: { id: updateWorkshopItemOrder.workshopId, ownerId: userId },
      include: {
        sections: {
          orderBy: {
            orderIndex: 'asc',
          },
          select: {
            id: true,
            orderIndex: true,
            elements: {
              orderBy: {
                orderIndex: 'asc',
              },
              select: {
                id: true,
                orderIndex: true,
              },
            },
          },
        },
      },
    });

    const result = moveItemFromIndexToIndex(
      workshop.sections,
      updateWorkshopItemOrder.fromPosition,
      updateWorkshopItemOrder.toPosition,
    );

    await this.prismaService.$transaction(async (tx) => {
      for (const section of result.sections) {
        await tx.workshopSection.update({
          data: {
            orderIndex: section.orderIndex,
          },
          where: {
            id: section.id,
          },
        });
        for (const element of section.elements) {
          await tx.workshopElement.update({
            data: {
              orderIndex: element.orderIndex,
              workshopSectionId: section.id,
            },
            where: { id: element.id },
          });
        }
      }
    });
    return result;
  }

  private findWorkshopByIdWhereQuery(
    userSessionId: string | undefined,
    workshopId: string,
    workshopWhere: Prisma.WorkshopWhereInput = {},
  ): Prisma.WorkshopWhereInput {
    const ability = defineAbilityForUser(userSessionId);
    return {
      AND: [
        accessibleBy(ability, ABILITY_ACTION_READ).Workshop,
        { id: workshopId },
        workshopWhere,
      ],
    };
  }
}
