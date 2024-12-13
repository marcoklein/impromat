import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { FindManyWorkshopsArgs } from 'src/dtos/args/find-many-workshops-args';
import { DuplicateWorkshopInput } from 'src/dtos/inputs/duplicate-workshop-input';
import { UpdateWorkshopItemOrder } from 'src/dtos/inputs/update-workshop-item-order';
import { User } from 'src/dtos/types/user.dto';
import { WorkshopSection } from 'src/dtos/types/workshop-section.dto';
import { Workshop } from 'src/dtos/types/workshop.dto';
import { Nullable } from 'src/utils/nullish';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import {
  CreateWorkshopInput,
  UpdateWorkshopInput,
} from '../../dtos/inputs/workshop.inputs';
import {
  DATALOADER_CONTEXT,
  DataLoaderContext,
} from '../database/dataloader-context.interface';
import { WorkshopService } from './workshop.service';

@Resolver(Workshop)
export class WorkshopController {
  constructor(private workshopService: WorkshopService) {}

  @ResolveField(() => Boolean, {
    nullable: true,
    description:
      'True, if liked by the logged in user. Undefined, if there is no user logged in.',
  })
  async isLiked(
    @Parent() workshop: Workshop,
    @Context(DATALOADER_CONTEXT) context: DataLoaderContext,
  ) {
    return this.workshopService.findIsLiked(workshop, context);
  }

  @ResolveField(() => [WorkshopSection])
  async sections(
    @Parent() workshop: Workshop,
    @Context(DATALOADER_CONTEXT) context: DataLoaderContext,
  ) {
    return this.workshopService.findSections(workshop, context);
  }

  @ResolveField(() => User)
  async owner(
    @Parent() workshop: Workshop,
    @Context(DATALOADER_CONTEXT) context: DataLoaderContext,
  ) {
    return this.workshopService.findOwner(workshop, context);
  }

  @UseGuards(GraphqlAuthGuard)
  @ResolveField(() => Boolean, {
    nullable: true,
    description:
      'Convenience field to determine if the owner of the workshop is the logged in user.',
  })
  async isOwnerMe(
    @Parent() workshop: Workshop,
    @Context(DATALOADER_CONTEXT) context: DataLoaderContext,
  ) {
    return this.workshopService.findIsOwnerMe(workshop, context);
  }

  @ResolveField(() => Boolean, {
    nullable: true,
    description: 'If true, the client is authorized to edit the workshop.',
  })
  async canEdit(
    @Parent() workshop: Workshop,
    @SessionUserId() userSessionId: string | undefined,
  ) {
    return this.workshopService.getCanEdit(workshop, userSessionId);
  }

  @Query(() => Workshop, { nullable: true })
  async workshop(
    @Context(DATALOADER_CONTEXT) context: DataLoaderContext,
    @Args('id', { type: () => ID }) workshopId: string,
  ): Promise<Nullable<Workshop>> {
    return this.workshopService.queryWorkshopById(context, workshopId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [Workshop], {
    description: 'Find workshops.',
  })
  async workshops(
    @SessionUserId() userId: string,
    @Args() args: FindManyWorkshopsArgs,
  ): Promise<Workshop[] | null> {
    return this.workshopService.findWorkshops(userId, args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Workshop)
  async createWorkshop(
    @Args('input')
    createWorkshopInput: CreateWorkshopInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Workshop> {
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
  ): Promise<Workshop> {
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

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Workshop)
  async duplicateWorkshop(
    @SessionUserId() userId: string,
    @Args('input') duplicateWorkshopInput: DuplicateWorkshopInput,
  ) {
    return await this.workshopService.duplicateWorkshop(
      userId,
      duplicateWorkshopInput,
    );
  }
}
