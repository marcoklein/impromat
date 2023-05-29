import { Args, Query, Resolver } from '@nestjs/graphql';
import { SessionUserId } from 'src/decorators/session-user-id.decorator';
import { ElementTagsFilterInput } from 'src/dtos/inputs/element-tags-filter-input';
import { ElementTag } from 'src/dtos/types/element-tag.dto';
import { Nullable } from 'src/utils/nullish';
import { ElementTagService } from '../services/element-tag.service';

@Resolver(ElementTag)
export class ElementTagsController {
  constructor(private elementTagsService: ElementTagService) {}

  @Query(() => [ElementTag])
  async tags(
    @Args('filter', {
      type: () => ElementTagsFilterInput,
      nullable: true,
    })
    filter: Nullable<ElementTagsFilterInput>,
    @Args('skip', { nullable: true, defaultValue: 0 }) skip: number,
    @Args('take', { nullable: true, defaultValue: 20 }) take: number,
    @SessionUserId() sessionUserId: Nullable<string>,
  ) {
    return await this.elementTagsService.findAvailableTags(
      filter ?? undefined,
      { skip, take },
      sessionUserId,
    );
  }
}
