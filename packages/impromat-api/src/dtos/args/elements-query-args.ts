import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';
import { Nullable } from 'src/utils/nullish';
import {
  ElementsFilterInput,
  ElementsOrderByInput,
} from '../inputs/elements-query-input';

@ArgsType()
export class ElementsQueryArgs {
  @Field(() => ElementsFilterInput, { nullable: true })
  filter: Nullable<ElementsFilterInput>;

  @Field(() => ElementsOrderByInput, { nullable: true })
  orderBy: Nullable<ElementsOrderByInput>;

  @Min(0)
  @IsInt()
  @Field(() => Int, { defaultValue: 0 })
  skip: number;

  @IsInt()
  @Min(1)
  @Max(100)
  @Field(() => Int, { defaultValue: 20 })
  take: number;
}
