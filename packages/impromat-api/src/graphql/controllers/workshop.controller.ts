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
import { Workshop, WorkshopOmittedFields } from 'src/dtos/types/workshop.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import {
  CreateWorkshopInput,
  UpdateWorkshopInput,
} from '../../dtos/inputs/workshop.inputs';
import { WorkshopRecommendationService } from '../services/workshop-recommendation.service';
import { WorkshopService } from '../services/workshop.service';

@Resolver(Workshop)
export class WorkshopController {
  constructor(
    private workshopService: WorkshopService,
    private workshopRecommendationService: WorkshopRecommendationService,
  ) {}

  @ResolveField(() => Boolean)
  async isLiked(
    @Parent() workshop: Workshop,
    @SessionUserId() userSessionId: string,
  ) {
    const elementFavoriteRelations = await this.workshopService
      .findWorkshopById(userSessionId, workshop.id)
      .userLikedWorkshops({ where: { userId: userSessionId } });
    return elementFavoriteRelations && elementFavoriteRelations.length > 0;
  }

  @ResolveField(() => [Element], {
    description: 'Find recommended elements.',
  })
  async elementRecommendations(
    @Parent() workshop: Workshop,
    @SessionUserId() userId: string,
  ) {
    return await this.workshopRecommendationService.findElementRecommendations(
      userId,
      workshop.id,
    );
  }

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

  @UseGuards(GraphqlAuthGuard)
  @ResolveField(() => Boolean)
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

  @Query(() => Workshop, { nullable: true })
  async workshop(
    @SessionUserId() userId: string | undefined,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Omit<Workshop, WorkshopOmittedFields> | null> {
    return this.workshopService.findWorkshopById(userId, id);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query(() => [Workshop], {
    description: 'Find workshops.',
  })
  async workshops(
    @SessionUserId() userId: string,
    @Args() args: FindManyWorkshopsArgs,
  ): Promise<Omit<Workshop, WorkshopOmittedFields>[] | null> {
    return this.workshopService.findWorkshops(userId, args);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Workshop)
  async createWorkshop(
    @Args('input')
    createWorkshopInput: CreateWorkshopInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Omit<Workshop, WorkshopOmittedFields>> {
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
  ): Promise<Omit<Workshop, WorkshopOmittedFields>> {
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
