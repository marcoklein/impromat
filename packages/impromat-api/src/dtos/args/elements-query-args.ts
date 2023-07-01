import { ArgsType, Field } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import {
  ElementsFilterInput,
  ElementsOrderByInput,
} from '../inputs/elements-query-input';
import { PaginationArgs } from './pagination-args';

@ArgsType()
export class ElementsQueryArgs extends PaginationArgs {
  @Field(() => ElementsFilterInput, { nullable: true })
  filter: Nullable<ElementsFilterInput>;

  @Field(() => ElementsOrderByInput, { nullable: true })
  orderBy: Nullable<ElementsOrderByInput>;
}
