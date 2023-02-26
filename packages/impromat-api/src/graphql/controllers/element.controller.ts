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
import { ElementTag } from 'src/dtos/types/element-tag.dto';
import { Element, ElementRelations } from 'src/dtos/types/element.dto';
import { User } from 'src/dtos/types/user.dto';
import { WorkshopElement } from 'src/dtos/types/workshop-element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementService } from '../services/element.service';

@Resolver(Element)
@UseGuards(GraphqlAuthGuard)
export class ElementController {
  constructor(private userElementService: ElementService) {}

  @ResolveField(() => [User])
  async owner(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.userElementService
      .findElementById(userSessionId, element.id)
      .owner();
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

  @Query(() => Element)
  async element(
    @SessionUserId() userId: string,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Omit<Element, ElementRelations> | null> {
    return this.userElementService.findElementById(userId, id);
  }

  @Query(() => [Element])
  async elements(
    @SessionUserId() userId: string,
  ): Promise<Omit<Element, ElementRelations>[] | null> {
    return this.userElementService.findElementsFromUser(userId);
  }

  @Mutation(() => Element)
  async createElement(
    @Args('input')
    createWorkshopInput: CreateElementInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Omit<Element, ElementRelations>> {
    return this.userElementService.createElement(
      sessionUserId,
      createWorkshopInput,
    );
  }

  @Mutation(() => Element)
  async updateElement(
    @Args('input') updateElementInput: UpdateElementInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Omit<Element, ElementRelations>> {
    return await this.userElementService.updateElement(
      sessionUserId,
      updateElementInput,
    );
  }
}
