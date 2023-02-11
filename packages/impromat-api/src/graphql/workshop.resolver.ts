import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { WorkshopSection } from 'src/dtos/workshop-section.dto';
import { Workshop, WorkshopRelations } from 'src/dtos/workshop.dto';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { SessionUserId } from './session-user-id.decorator';

@Resolver(Workshop)
@UseGuards(GraphqlAuthGuard)
export class WorkshopResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField(() => [WorkshopSection])
  async sections(@Parent() workshop: Workshop) {
    return this.findWorkshopById(workshop.id).sections();
  }

  @ResolveField(() => [WorkshopSection])
  async owner(@Parent() workshop: Workshop) {
    return this.findWorkshopById(workshop.id).owner();
  }

  @Query(() => Workshop)
  async workshop(
    @SessionUserId() userId: string,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Omit<Workshop, WorkshopRelations> | null> {
    return this.findWorkshopById(id);
  }

  @Query(() => [Workshop])
  async userWorkshops(
    @SessionUserId() userId: string,
  ): Promise<Omit<Workshop, WorkshopRelations>[] | null> {
    return await this.prismaService.user
      .findUniqueOrThrow({
        where: { id: userId },
      })
      .workshops();
  }

  private findWorkshopById(id: string) {
    return this.prismaService.workshop.findUniqueOrThrow({
      where: { id },
    });
  }
}
