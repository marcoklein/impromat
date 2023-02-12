import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { WorkshopSection } from 'src/dtos/workshop-section.dto';
import { Workshop, WorkshopRelations } from 'src/dtos/workshop.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { CreateWorkshopInput, UpdateWorkshopInput } from './workshop.inputs';
import { WorkshopService } from './workshop.service';

@Resolver(Workshop)
@UseGuards(GraphqlAuthGuard)
export class WorkshopController {
  constructor(private workshopService: WorkshopService) {}

  @ResolveField(() => [WorkshopSection])
  async sections(
    @Parent() workshop: Workshop,
    @SessionUserId() userSessionId: string,
  ) {
    return this.workshopService
      .findWorkshopById(userSessionId, workshop.id)
      .sections({
        orderBy: {
          orderIndex: 'asc',
        },
      });
  }

  @ResolveField(() => [WorkshopSection])
  async owner(
    @Parent() workshop: Workshop,
    @SessionUserId() userSessionId: string,
  ) {
    return this.workshopService
      .findWorkshopById(userSessionId, workshop.id)
      .owner();
  }

  @Query(() => Workshop)
  async workshop(
    @SessionUserId() userId: string,
    @Args('workshopId', { type: () => ID }) id: string,
  ): Promise<Omit<Workshop, WorkshopRelations> | null> {
    return this.workshopService.findWorkshopById(userId, id);
  }

  @Query(() => [Workshop])
  async workshops(
    @SessionUserId() userId: string,
  ): Promise<Omit<Workshop, WorkshopRelations>[] | null> {
    return this.workshopService.findWorkshopsFromUser(userId);
  }

  @Mutation(() => Workshop)
  async createWorkshop(
    @Args('input')
    createWorkshopInput: CreateWorkshopInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Omit<Workshop, WorkshopRelations>> {
    return this.workshopService.createWorkshop(
      sessionUserId,
      createWorkshopInput,
    );
  }

  @Mutation(() => Workshop)
  async updateWorkshop(
    @Args('input') updateWorkshopInput: UpdateWorkshopInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Omit<Workshop, WorkshopRelations>> {
    return await this.workshopService.updateWorkshop(
      sessionUserId,
      updateWorkshopInput,
    );
  }
}
