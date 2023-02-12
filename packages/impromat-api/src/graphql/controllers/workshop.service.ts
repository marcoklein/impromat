import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { CreateWorkshopInput, UpdateWorkshopInput } from './workshop.inputs';

@Injectable()
export class WorkshopService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // TODO all function take the userSessionId => could this also be injected for specific requests?
  findWorkshopById(userSessionId: string, id: string) {
    return this.prismaService.workshop.findFirstOrThrow({
      where: { id, ownerId: userSessionId },
    });
  }

  findWorkshopsFromUser(userSessionId: string) {
    return this.prismaService.workshop.findMany({
      where: { ownerId: userSessionId },
    });
  }

  async createWorkshop(
    sessionUserId: string,
    createWorkshopInput: CreateWorkshopInput,
  ) {
    const user = await this.prismaService.user.upsert({
      create: { id: sessionUserId },
      update: {},
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

  updateWorkshop(
    sessionUserId: string,
    updateWorkshopInput: UpdateWorkshopInput,
  ) {
    return this.prismaService.$transaction(
      async (tx) => {
        const existingWorkshop = await tx.workshop.findFirstOrThrow({
          where: { id: updateWorkshopInput.id, ownerId: sessionUserId },
          include: { sections: true },
        });

        // TODO normalize orderIndex
        // TODO verify inputs that they really belong to user

        const existingSections: { id?: string; orderIndex?: number }[] =
          existingWorkshop.sections;

        const withoutDeleted = existingSections.filter(
          (existingSection) =>
            !updateWorkshopInput.sections?.delete?.find(
              (input) => input.id === existingSection.id,
            ),
        );
        const withUpdates = withoutDeleted.map((section) => {
          const updatedSection = updateWorkshopInput.sections?.update?.find(
            ({ id }) =>
              id !== undefined && section.id !== undefined && id === section.id,
          );
          if (updatedSection?.orderIndex !== undefined) {
            section.orderIndex = updatedSection.orderIndex;
          }
          return section;
        });
        const withCreated = withUpdates.concat(
          ...(updateWorkshopInput.sections?.create ?? []),
        );
        const sorted = withCreated.sort(
          (a, b) =>
            (a.orderIndex ?? Number.MAX_SAFE_INTEGER) -
            (b.orderIndex ?? Number.MAX_SAFE_INTEGER),
        );
        sorted.forEach((section, index) => {
          section.orderIndex = index;
        });

        const update =
          updateWorkshopInput.sections?.update?.map((section) => ({
            where: { id: section.id },
            data: {
              ...section,
              ...{
                elements: {
                  create: [],
                },
              },
            },
          })) ?? [];

        const create =
          updateWorkshopInput.sections?.create?.map((section, index) => {
            const orderIndex =
              section.orderIndex ?? existingSections.length + index;
            return {
              ...section,
              ...{
                orderIndex,
                elements: undefined,
                // elements: {
                //   create: [],
                // },
                // workshopId: existingWorkshop.id,
              },
            };
          }) ?? [];

        const workshop = await tx.workshop.update({
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
        return workshop;
      },
      // this transactions query used to result in timeouts
      // therefore, the timeout and maxWait got increased
      { timeout: 1000, maxWait: 500 },
    );
  }
}
