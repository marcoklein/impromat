import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import { ElementSearchInput } from 'src/dtos/inputs/element-search-input';
import { ElementSearchResult } from 'src/dtos/types/element-search-result.dto';
import { Element, ElementOmittedFields } from 'src/dtos/types/element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementSearchV2Service } from './element-search-v2.service';
import { ElementSearchService } from './element-search.service';
import { ElementSearchKeywords } from './search-element-v2.dto';
import { ElementSearchV2Input } from './search-element-v2.input';

@Resolver()
export class ElementSearchController {
  constructor(
    private elementSearchV2Service: ElementSearchV2Service,
    private elementSearchService: ElementSearchService,
  ) {}

  @Query(() => [Element])
  async searchElementsV2(
    @Args() paginationArgs: PaginationArgs,
    @Args('input') input: ElementSearchV2Input,
    @SessionUserId() userId: string | undefined,
  ): Promise<Omit<Element, ElementOmittedFields>[]> {
    return this.elementSearchV2Service.searchElements(
      userId,
      input,
      paginationArgs,
    );
  }

  @Query(() => ElementSearchKeywords)
  async searchElementsV2Keywords(
    @Args('input') input: ElementSearchV2Input,
    @SessionUserId() userId: string | undefined,
  ): Promise<ElementSearchKeywords> {
    return this.elementSearchV2Service.keywords(userId, input);
  }

  @Query(() => [ElementSearchResult], {
    deprecationReason: 'Use searchElementsV2 instead',
  })
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
