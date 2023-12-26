import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class WorkshopElementService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  findWorkshopElementById(userRequestId: string, id: string) {
    // const userRequestId = this.userSessionService.getActiveUserId();
    return this.prismaService.workshopElement.findFirstOrThrow({
      where: {
        workshopSection: {
          workshop: { OR: [{ ownerId: userRequestId }, { isPublic: true }] },
        },
        id,
      },
    });
  }
}
