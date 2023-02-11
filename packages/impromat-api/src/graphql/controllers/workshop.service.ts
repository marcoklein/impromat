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

  createWorkshop(
    sessionUserId: string,
    createWorkshopInput: CreateWorkshopInput,
  ) {
    return this.prismaService.$transaction(async (tx) => {
      async function findOrCreate() {
        const user = await tx.user.findUniqueOrThrow({
          where: { id: sessionUserId },
        });
        if (user) return user;
        return await tx.user.create({
          data: { id: sessionUserId },
        });
      }
      const user = await findOrCreate();
      const workshop = await tx.workshop.create({
        data: {
          ...createWorkshopInput,
          ownerId: user.id,
          sections: { create: [{}] },
        },
      });
      return workshop;
    });
  }

  updateWorkshop(
    sessionUserId: string,
    updateWorkshopInput: UpdateWorkshopInput,
  ) {
    return this.prismaService.$transaction(async (tx) => {
      await tx.workshop.findFirstOrThrow({
        where: { id: updateWorkshopInput.id, ownerId: sessionUserId },
      });
      const workshop = await tx.workshop.update({
        data: {
          ...updateWorkshopInput,
        },
        where: {
          id: updateWorkshopInput.id,
        },
      });
      return workshop;
    });
  }
}
