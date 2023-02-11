import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Element } from 'src/dtos/element.dto';
import { WorkshopSection } from 'src/dtos/workshop-section.dto';
import { Workshop } from 'src/dtos/workshop.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { PrismaService } from '../services/prisma.service';

@Resolver(WorkshopSection)
@UseGuards(GraphqlAuthGuard)
export class WorkshopSectionController {
  constructor(private prismaService: PrismaService) {}

  @ResolveField(() => [Element])
  async elements(
    @Parent() sectionDto: WorkshopSection,
    @SessionUserId() userSessionId: string,
  ) {
    return this.prismaService.workshopSection
      .findFirstOrThrow({
        where: { id: sectionDto.id, workshop: { ownerId: userSessionId } },
      })
      .elements();
  }

  @ResolveField(() => [Workshop])
  async workshop(
    @Parent() sectionDto: WorkshopSection,
    @SessionUserId() userSessionId: string,
  ) {
    return this.prismaService.workshopSection
      .findFirstOrThrow({
        where: { id: sectionDto.id, workshop: { ownerId: userSessionId } },
      })
      .workshop();
  }
}
