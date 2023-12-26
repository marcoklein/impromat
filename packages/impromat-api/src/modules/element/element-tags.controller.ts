import { Args, Query, Resolver } from '@nestjs/graphql';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { ElementTagsFilterInput } from 'src/dtos/inputs/element-tags-filter-input';
import { ElementTag } from 'src/dtos/types/element-tag.dto';
import { Nullable } from 'src/utils/nullish';
import { ElementTagService } from './element-tag.service';
import { PaginationArgs } from 'src/dtos/args/pagination-args';

@Resolver(ElementTag)
export class ElementTagsController {
  constructor(private elementTagsService: ElementTagService) {}

  @Query(() => [ElementTag])
  async tags(
    @SessionUserId() sessionUserId: string | undefined,
    @Args('filter', {
      type: () => ElementTagsFilterInput,
      nullable: true,
    })
    filter: Nullable<ElementTagsFilterInput>,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return await this.elementTagsService.findAvailableTags(
      sessionUserId,
      filter ?? undefined,
      paginationArgs,
    );
  }
}
