import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { ElementsQueryArgs } from 'src/dtos/args/elements-query-args';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { ElementsFilterInput } from 'src/dtos/inputs/elements-query-input';
import { ElementQueryResult } from 'src/dtos/types/element-query-result.dto';
import { ElementTag } from 'src/dtos/types/element-tag.dto';
import { Element } from 'src/dtos/types/element.dto';
import { User } from 'src/dtos/types/user.dto';
import { WorkshopElement } from 'src/dtos/types/workshop-element.dto';
import { Nullable } from 'src/utils/nullish';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementService } from '../services/element.service';

@Resolver(Element)
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

  @ResolveField(() => String)
  async markdownShort(@Parent() element: Element) {
    return element.markdown?.substring(0, 300);
  }

  @UseGuards(GraphqlAuthGuard)
  @ResolveField(() => [User])
  async owner(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.userElementService
      .findElementById(userSessionId, element.id)
      .owner();
  }

  @UseGuards(GraphqlAuthGuard)
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

  @Query(() => [ElementQueryResult])
  async elements(
    @Args() { filter, orderBy, skip, take }: ElementsQueryArgs,
    @SessionUserId() userId: string,
  ) {
    const elements = await this.userElementService.findElementsFromUser(
      userId,
      {
        filter: filter ?? { isOwnerMe: true, isPublic: true },
        orderBy: orderBy ?? { notImplemented: true },
        skip,
        take,
      },
    );
    return elements.map((element) => ({
      element,
    }));
  }

  @Query(() => Int)
  async elementsCount(
    @Args('filter', { type: () => ElementsFilterInput, nullable: true })
    filterInput: Nullable<ElementsFilterInput>,
    @SessionUserId() userId: string,
  ) {
    throw new Error('Not implemented yet');
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
