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
import { UpdateWorkshopItemOrder } from 'src/dtos/inputs/update-workshop-item-order';
import { User } from 'src/dtos/types/user.dto';
import { WorkshopSection } from 'src/dtos/types/workshop-section.dto';
import { Workshop, WorkshopRelations } from 'src/dtos/types/workshop.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import {
  CreateWorkshopInput,
  UpdateWorkshopInput,
} from '../../dtos/inputs/workshop.inputs';
import { WorkshopService } from '../services/workshop.service';

@Resolver(Workshop)
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

  @ResolveField(() => User)
  async owner(
    @Parent() workshop: Workshop,
    @SessionUserId() userSessionId: string,
  ) {
    return this.workshopService
      .findWorkshopById(userSessionId, workshop.id)
      .owner();
  }

  @ResolveField(() => Boolean)
  async canEdit(
    @Parent() workshop: Workshop,
    @SessionUserId() userSessionId: string | undefined,
  ) {
    if (userSessionId) {
      const owner = await this.workshopService
        .findWorkshopById(userSessionId, workshop.id)
        .owner();
      if (!owner) return null;
      return owner.id === userSessionId;
    }
    return null;
  }

  @Query(() => Workshop)
  async workshop(
    @SessionUserId() userId: string | undefined,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Omit<Workshop, WorkshopRelations> | null> {
    return this.workshopService.findWorkshopById(userId, id);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [Workshop])
  async workshops(
    @SessionUserId() userId: string,
  ): Promise<Omit<Workshop, WorkshopRelations>[] | null> {
    return this.workshopService.findWorkshopsFromUser(userId);
  }

  @UseGuards(GraphqlAuthGuard)
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

  @UseGuards(GraphqlAuthGuard)
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

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Workshop, { nullable: true })
  async deleteWorkshop(
    @SessionUserId() userId: string,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Pick<Workshop, 'id'> | null> {
    return this.workshopService.deleteWorkshop(userId, id);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Workshop)
  async updateWorkshopItemOrder(
    @SessionUserId() userId: string,
    @Args('input') updateWorkshopItemOrder: UpdateWorkshopItemOrder,
  ) {
    await this.workshopService.updateWorkshopItemOrder(
      userId,
      updateWorkshopItemOrder,
    );
    return this.workshopService.findWorkshopById(
      userId,
      updateWorkshopItemOrder.workshopId,
    );
  }
}
