import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { ElementTag } from 'src/dtos/types/element-tag.dto';
import {
  Element,
  ElementOmittedFields,
  ElementSnapshot,
} from 'src/dtos/types/element.dto';
import { User } from 'src/dtos/types/user.dto';
import { WorkshopElement } from 'src/dtos/types/workshop-element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementRecommendationService } from './element-recommendation.service';
import { ElementSnapshotService } from './element-snapshot.service';
import { ElementService } from './element.service';

@Resolver(Element)
export class ElementController {
  constructor(
    private elementService: ElementService,
    private elementRecommendationService: ElementRecommendationService,
    private elementSnapshotService: ElementSnapshotService,
  ) {}

  @ResolveField(() => [Element])
  async recommendations(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.elementRecommendationService.findRecommendations(
      userSessionId,
      element.id,
    );
  }

  @ResolveField(() => Boolean, {
    nullable: true,
    description: 'Set if the element is called from a user context.',
  })
  async isFavorite(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.elementService.findIsFavorite(element, userSessionId);
  }

  @ResolveField(() => String, {
    nullable: true,
    description:
      'Shortened markdown text for preview purposes to avoid loading the whole content in a request.',
  })
  async markdownShort(@Parent() element: Element) {
    return element.markdown?.substring(0, 300);
  }

  @ResolveField(() => User, { nullable: true })
  async owner(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string | undefined,
  ) {
    return this.elementService.findElementOwner(userSessionId, element.id);
  }

  @ResolveField(() => Boolean, {
    nullable: true,
    description:
      'Convenience field to determine if the owner of the element is the logged in user.',
  })
  async isOwnerMe(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string | undefined,
  ) {
    return this.elementService.findIsOwnerMe(userSessionId, element.id);
  }

  @ResolveField(() => [ElementTag], { complexity: 5 })
  async tags(@Parent() element: Element) {
    return this.elementService.findElementTags(element);
  }

  @ResolveField(() => [WorkshopElement])
  async usedBy(
    @Parent() element: Element,
    @SessionUserId() userSessionId: string,
  ) {
    return this.elementService.findUsedByWorkshopElements(
      element,
      userSessionId,
    );
  }

  @ResolveField(() => [ElementSnapshot], {
    description: 'Changes of the element.',
  })
  async snapshots(
    @Args() args: PaginationArgs,
    @Parent() element: Element,
    @SessionUserId() userSessionId: string | undefined,
  ): Promise<Partial<ElementSnapshot>[]> {
    return this.elementSnapshotService.findElementSnapshots(
      userSessionId,
      element.id,
      args,
    );
  }

  @Query(() => Element, { nullable: true })
  async element(
    @Args('id', { type: () => ID }) id: string,
    @SessionUserId() userId: string,
  ) {
    return this.elementService.findElementById(userId, id);
  }

  @Mutation(() => Element)
  async createElement(
    @Args('input')
    createWorkshopInput: CreateElementInput,
    @SessionUserId() sessionUserId: string,
  ) {
    return this.elementService.createElement(
      sessionUserId,
      createWorkshopInput,
    );
  }

  @Mutation(() => Element)
  async updateElement(
    @Args('input') updateElementInput: UpdateElementInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Omit<Element, ElementOmittedFields> | null> {
    return await this.elementService.updateElement(
      sessionUserId,
      updateElementInput,
    );
  }
}
