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
        if (updateWorkshopInput.sections) {
          const newSections = updateWorkshopInput.sections;
          const existingSections = existingWorkshop.sections;
          for (
            let orderIndex = 0;
            orderIndex < updateWorkshopInput.sections.length;
            orderIndex++
          ) {
            const section = updateWorkshopInput.sections[orderIndex];

            if (section.id) {
              if (!existingSections.find(({ id }) => id === section.id)) {
                throw new Error(
                  'Cannot create new section with id section=' +
                    JSON.stringify(section),
                );
              }
              // update
              await tx.workshopSection.update({
                where: { id: section.id },
                data: { ...section, ...{ orderIndex } },
              });
            } else {
              // create
              await tx.workshopSection.create({
                data: {
                  ...section,
                  ...{ orderIndex, workshopId: existingWorkshop.id },
                },
              });
            }
          }
          // delete
          const itemsToDelete = existingSections
            .filter(
              (x) => !newSections.find((newSection) => newSection.id === x.id),
            )
            .map(({ id }) => id);
          await tx.workshopSection.deleteMany({
            where: { id: { in: itemsToDelete } },
          });
        }

        const workshop = await tx.workshop.update({
          data: {
            ...updateWorkshopInput,
            ...{ sections: undefined },
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
