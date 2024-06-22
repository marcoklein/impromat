import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { getGraphqlFields } from '../../utils/get-graphql-fields';
import { WorkshopSearchResult } from './workshop-search-result.dto';
import { WorkshopSearchInput } from './workshop-search.input';
import { WorkshopSearchService } from './workshop-search.service';

@Resolver()
export class WorkshopSearchController {
  constructor(private workshopSearchService: WorkshopSearchService) {}

  @Query(() => [WorkshopSearchResult], {
    description: 'Universal search for workshops. Works for all users.',
  })
  async searchWorkshops(
    @Args() paginationArgs: PaginationArgs,
    @Args('input') input: WorkshopSearchInput,
    @SessionUserId() userId: string | undefined,
    @Info() info: GraphQLResolveInfo,
  ): Promise<WorkshopSearchResult[]> {
    const fields = getGraphqlFields(info.fieldNodes, info.fragments);
    console.log('fields', JSON.stringify(fields, null, 2));

    return this.workshopSearchService.searchWorkshops(
      userId,
      input,
      paginationArgs,
    );
  }
}
