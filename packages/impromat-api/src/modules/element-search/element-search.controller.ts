import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { ElementSearchResult } from './element-search-result.dto';
import { ElementSearchTfidfService } from './element-search-tfidf.service';
import { ElementSearchService } from './element-search.service';
import { ElementSearchKeywords } from './search-element.dto';
import { ElementSearchInput } from './search-element.input';

@Resolver()
export class ElementSearchController {
  constructor(
    private elementSearchTfidfService: ElementSearchTfidfService,
    private elementSearchService: ElementSearchService,
  ) {}

  @Query(() => [ElementSearchResult])
  async searchElements(
    @Args() paginationArgs: PaginationArgs,
    @SessionUserId() userId: string | undefined,
    @Args('input', { nullable: true })
    input?: ElementSearchInput,
  ): Promise<ElementSearchResult[]> {
    return this.elementSearchService.searchElements(
      userId,
      input ?? {},
      paginationArgs,
    );
  }

  @Query(() => [ElementSearchResult])
  async searchElementsTfidf(
    @Args() paginationArgs: PaginationArgs,
    @Args('input') input: ElementSearchInput,
    @SessionUserId() userId: string | undefined,
  ): Promise<ElementSearchResult[]> {
    return this.elementSearchTfidfService.searchElements(
      userId,
      input,
      paginationArgs,
    );
  }

  @Query(() => ElementSearchKeywords)
  async searchElementsKeywords(
    @Args('input') input: ElementSearchInput,
    @SessionUserId() userId: string | undefined,
  ): Promise<ElementSearchKeywords> {
    return this.elementSearchTfidfService.keywords(userId, input);
  }
}
