import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { UpdateUserFavoriteElementInput } from 'src/dtos/inputs/update-favorite-element-input';
import { Element } from 'src/dtos/types/element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { UserFavoriteElementsService } from '../services/user-favorite-elements.service';

@Resolver(Element)
@UseGuards(GraphqlAuthGuard)
export class UserFavoriteElementsController {
  constructor(
    private userFavoriteElementsService: UserFavoriteElementsService,
  ) {}

  @Mutation(() => Boolean)
  async updateUserFavoriteElement(
    @Args('input')
    createWorkshopInput: UpdateUserFavoriteElementInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<boolean> {
    await this.userFavoriteElementsService.updateFavoriteElementOfUser(
      sessionUserId,
      createWorkshopInput.elementId,
      createWorkshopInput.isFavorite,
    );
    return true;
  }
}
