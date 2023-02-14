import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserSessionService } from './user-session.service';

@Injectable()
export class WorkshopElementService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private userSessionService: UserSessionService,
  ) {}

  findWorkshopElementById(userRequestId: string, id: string) {
    // const userRequestId = this.userSessionService.getActiveUserId();
    return this.prismaService.workshopElement.findFirstOrThrow({
      where: { workshopSection: { workshop: { ownerId: userRequestId } }, id },
    });
  }
}
