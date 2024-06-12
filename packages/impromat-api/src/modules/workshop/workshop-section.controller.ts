import { accessibleBy } from '@casl/prisma';
import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { Element } from 'src/dtos/types/element.dto';
import { WorkshopSection } from 'src/dtos/types/workshop-section.dto';
import { Workshop } from 'src/dtos/types/workshop.dto';
import { defineAbilityForUser } from 'src/graphql/abilities';
import { PrismaService } from '../database/prisma.service';

@Resolver(WorkshopSection)
@UseGuards(GraphqlAuthGuard)
export class WorkshopSectionController {
  constructor(private prismaService: PrismaService) {}

  @ResolveField(() => [Element])
  async elements(
    @Parent() sectionDto: WorkshopSection,
    @SessionUserId() userSessionId: string,
  ) {
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

  @ResolveField(() => [Workshop])
  async workshop(
    @Parent() sectionDto: WorkshopSection,
    @SessionUserId() userSessionId: string,
  ) {
    const ability = defineAbilityForUser(userSessionId);
    return this.prismaService.workshopSection
      .findUnique({
        where: { id: sectionDto.id, workshop: accessibleBy(ability).Workshop },
      })
      .workshop();
  }
}
