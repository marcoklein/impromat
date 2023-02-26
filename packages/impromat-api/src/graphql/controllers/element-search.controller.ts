import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { ElementSearchInput } from 'src/dtos/inputs/element-search-input';
import { ElementSearchResult } from 'src/dtos/types/element-search-result.dto';
import { Element } from 'src/dtos/types/element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementSearchService } from '../services/element-search.service';

@Resolver(Element)
@UseGuards(GraphqlAuthGuard)
export class ElementSearchController {
  constructor(private elementSearchService: ElementSearchService) {}

  @Query(() => [ElementSearchResult])
  async searchElements(
    @Args('input')
    searchElementsInput: ElementSearchInput,
    @SessionUserId() userId: string,
  ): Promise<ElementSearchResult[]> {
    const elements = await this.elementSearchService.searchElements(
      userId,
      searchElementsInput,
    );
    return elements.map((result) => ({
      element: result.element as any,
      score: result.score,
    }));
  }
}
