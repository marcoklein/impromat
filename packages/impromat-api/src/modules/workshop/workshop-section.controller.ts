import { accessibleBy } from '@casl/prisma';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { WorkshopElement } from 'src/dtos/types/workshop-element.dto';
import { WorkshopSection } from 'src/dtos/types/workshop-section.dto';
import { Workshop } from 'src/dtos/types/workshop.dto';
import { defineAbilityForUser } from 'src/graphql/abilities';
import { PrismaService } from '../database/prisma.service';

@Resolver(WorkshopSection)
export class WorkshopSectionController {
  constructor(private prismaService: PrismaService) {}

  @ResolveField(() => [WorkshopElement])
  async elements(
    @Parent() sectionDto: WorkshopSection,
    @SessionUserId() userSessionId: string,
  ) {
    if ('elements' in sectionDto && !!sectionDto.elements)
      return sectionDto.elements;
    const ability = defineAbilityForUser(userSessionId);
    return this.prismaService.workshopSection
      .findUnique({
        where: { id: sectionDto.id },
      })
      .elements({
        orderBy: { orderIndex: 'asc' },
        where: accessibleBy(ability).WorkshopElement,
      });
  }

  @ResolveField(() => Workshop)
  async workshop(
    @Parent() sectionDto: WorkshopSection,
    @SessionUserId() userSessionId: string,
  ) {
    if ('workshop' in sectionDto) return sectionDto.workshop;
    const ability = defineAbilityForUser(userSessionId);
    return this.prismaService.workshopSection
      .findUnique({
        where: { id: sectionDto.id, workshop: accessibleBy(ability).Workshop },
      })
      .workshop();
  }
}
