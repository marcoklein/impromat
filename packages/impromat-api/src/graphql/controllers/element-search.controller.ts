import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ElementSearchInput } from 'src/dtos/inputs/element-search-input';
import { ElementSearchResult } from 'src/dtos/types/element-search-result.dto';
import { Element } from 'src/dtos/types/element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementSearchService } from '../services/element-search.service';

@Resolver(Element)
export class ElementSearchController {
  constructor(private elementSearchService: ElementSearchService) {}

  @Query(() => [ElementSearchResult])
  async searchElements(
    @Args('input')
    searchElementsInput: ElementSearchInput,
    @Args('skip', {
      nullable: true,
      type: () => Int,
      description: 'Helper field to pass skip argument into input field.',
    })
    skip: number,
    @Args('take', {
      nullable: true,
      type: () => Int,
      description: 'Helper field to pass take argument into input field.',
    })
    take: number,
    @SessionUserId() userId: string,
  ): Promise<ElementSearchResult[]> {
    if (skip !== undefined) searchElementsInput.skip = skip;
    if (take !== undefined) searchElementsInput.take = take;
    const elements = await this.elementSearchService.searchElements(
      userId,
      searchElementsInput,
    );
    return elements.map((result) => ({
      element: result.element as any,
      score: result.score,
      matches: result.matches,
    }));
  }
}
