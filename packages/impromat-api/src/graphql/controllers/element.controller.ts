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
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { ElementsQueryInput } from 'src/dtos/inputs/elements-query-input';
import { ElementTag } from 'src/dtos/types/element-tag.dto';
import { Element } from 'src/dtos/types/element.dto';
import { User } from 'src/dtos/types/user.dto';
import { WorkshopElement } from 'src/dtos/types/workshop-element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementService } from '../services/element.service';

@Resolver(Element)
@UseGuards(GraphqlAuthGuard)
export class ElementController {
  constructor(private userElementService: ElementService) {}

  @ResolveField(() => Boolean)
  async isFavorite(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    const elementFavoriteRelations = await this.userElementService
      .findElementById(userSessionId, element.id)
      .userFavoriteElement({
        where: {
          userId: userSessionId,
        },
      });
    return elementFavoriteRelations.length > 0;
  }

  @ResolveField(() => [User])
  async owner(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.userElementService
      .findElementById(userSessionId, element.id)
      .owner();
  }

  @ResolveField(() => Boolean)
  async isOwnerMe(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    if (userSessionId) {
      const owner = await this.userElementService
        .findElementById(userSessionId, element.id)
        .owner();
      if (owner) {
        return owner.id === userSessionId;
      } else {
        return false;
      }
    }
    return null;
  }

  @ResolveField(() => [ElementTag])
  async tags(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return (
      this.userElementService
        .findElementById(userSessionId, element.id)
        .tags() ?? []
    );
  }

  @ResolveField(() => [WorkshopElement])
  async usedBy(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.userElementService
      .findElementById(userSessionId, element.id)
      .workshopElements();
  }

  @Query(() => Element, { nullable: true })
  async element(
    @SessionUserId() userId: string,
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.userElementService.findElementById(userId, id);
  }

  @Query(() => [Element], { nullable: true })
  async elements(
    @Args('input') input: ElementsQueryInput,
    @Args('skip', { nullable: true }) skip: number,
    @Args('take', { nullable: true }) take: number,
    @SessionUserId() userId: string,
  ) {
    if (skip !== undefined) input.skip = skip;
    if (take !== undefined) input.take = take;
    return this.userElementService.findElementsFromUser(userId, input);
  }

  @Mutation(() => Element)
  async createElement(
    @Args('input')
    createWorkshopInput: CreateElementInput,
    @SessionUserId() sessionUserId: string,
  ) {
    return this.userElementService.createElement(
      sessionUserId,
      createWorkshopInput,
    );
  }

  @Mutation(() => Element)
  async updateElement(
    @Args('input') updateElementInput: UpdateElementInput,
    @SessionUserId() sessionUserId: string,
  ) {
    return await this.userElementService.updateElement(
      sessionUserId,
      updateElementInput,
    );
  }
}
