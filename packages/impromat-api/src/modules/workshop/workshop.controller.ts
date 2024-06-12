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
import { FindManyWorkshopsArgs } from 'src/dtos/args/find-many-workshops-args';
import { DuplicateWorkshopInput } from 'src/dtos/inputs/duplicate-workshop-input';
import { UpdateWorkshopItemOrder } from 'src/dtos/inputs/update-workshop-item-order';
import { User } from 'src/dtos/types/user.dto';
import { WorkshopSection } from 'src/dtos/types/workshop-section.dto';
import { Workshop } from 'src/dtos/types/workshop.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import {
  CreateWorkshopInput,
  UpdateWorkshopInput,
} from '../../dtos/inputs/workshop.inputs';
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
    @SessionUserId() userSessionId: string,
  ) {
    if (!userSessionId) return false;
    const elementFavoriteRelations = await this.workshopService
      .findWorkshopById(userSessionId, workshop.id)
      .userLikedWorkshops({ where: { userId: userSessionId } });
    return elementFavoriteRelations && elementFavoriteRelations.length > 0;
  }

  @ResolveField(() => [WorkshopSection])
  async sections(
    @Parent() workshop: Workshop,
    @SessionUserId() userSessionId: string,
  ) {
    if ('sections' in workshop) return workshop.sections;
    return this.workshopService.findSections(workshop, userSessionId);
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

  @UseGuards(GraphqlAuthGuard)
  @ResolveField(() => Boolean, {
    nullable: true,
    description:
      'Convenience field to determine if the owner of the workshop is the logged in user.',
  })
  async isOwnerMe(
    @Parent() workshop: Workshop,
    @SessionUserId() userSessionId: string,
  ) {
    if (userSessionId) {
      const owner = await this.workshopService
        .findWorkshopById(userSessionId, workshop.id)
        .owner();
      if (owner) {
        return owner.id === userSessionId;
      } else {
        return false;
      }
    }
    return null;
  }

  @ResolveField(() => Boolean, {
    nullable: true,
    description: 'If true, the client is authorized to edit the workshop.',
  })
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

  @Query(() => Workshop, { nullable: true })
  async workshop(
    @SessionUserId() userId: string | undefined,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Workshop | null> {
    return this.workshopService.findWorkshopById(userId, id);
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
