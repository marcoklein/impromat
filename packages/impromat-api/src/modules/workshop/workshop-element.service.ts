import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { WorkshopElement } from 'src/dtos/types/workshop-element.dto';
import { defineAbilityForUser } from 'src/graphql/abilities';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class WorkshopElementService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findWorkshopElementById(userRequestId: string, id: string) {
    return this.prismaService.workshopElement.findFirstOrThrow({
      where: {
        workshopSection: {
          workshop: { OR: [{ ownerId: userRequestId }, { isPublic: true }] },
        },
        id,
      },
    });
  }

  async findWorkshopSection(
    workshopElement: WorkshopElement,
    userRequestId: string,
  ) {
    const ability = defineAbilityForUser(userRequestId);
    return this.prismaService.workshopElement
      .findUnique({
        where: {
          ...accessibleBy(ability).WorkshopElement,
          id: workshopElement.id,
        },
      })
      .workshopSection();
  }

  async findBasedOn(workshopElement: WorkshopElement, userRequestId: string) {
    const ability = defineAbilityForUser(userRequestId);
    return this.prismaService.workshopElement
      .findUnique({
        where: {
          ...accessibleBy(ability).WorkshopElement,
          basedOn: accessibleBy(ability).Element,
          id: workshopElement.id,
        },
      })
      .basedOn();
  }
}
