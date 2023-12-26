import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Element as ElementEntity } from '@prisma/client';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { UpdateUserFavoriteElementInput } from 'src/dtos/inputs/update-favorite-element-input';
import { Element as ElementDto } from 'src/dtos/types/element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { UserFavoriteElementsService } from './user-favorite-elements.service';

@Resolver(ElementDto)
@UseGuards(GraphqlAuthGuard)
export class UserFavoriteElementsController {
  constructor(
    private userFavoriteElementsService: UserFavoriteElementsService,
  ) {}

  @Mutation(() => ElementDto, {
    nullable: true,
    description: 'Change the favorite state for element of the logged in user.',
  })
  async updateUserFavoriteElement(
    @Args('input')
    createWorkshopInput: UpdateUserFavoriteElementInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<ElementEntity | null> {
    const result =
      await this.userFavoriteElementsService.updateFavoriteElementOfUser(
        sessionUserId,
        createWorkshopInput.elementId,
        createWorkshopInput.isFavorite,
      );
    return result?.element;
  }
}
