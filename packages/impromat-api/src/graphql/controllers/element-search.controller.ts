import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { SearchElementsInput } from 'src/dtos/inputs/search-element-input';
import { Element, ElementRelations } from 'src/dtos/types/element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementService } from '../services/element.service';

@Resolver(Element)
@UseGuards(GraphqlAuthGuard)
export class ElementSearchController {
  constructor(private userElementService: ElementService) {}
  @Query(() => [Element])
  async searchElements(
    @Args('input')
    searchElementsInput: SearchElementsInput,
    @SessionUserId() userId: string,
  ): Promise<Omit<Element, ElementRelations>[] | null> {
    return this.userElementService.findElementsFromUser(userId);
  }
}
