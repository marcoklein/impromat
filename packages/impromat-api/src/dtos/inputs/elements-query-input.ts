import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { Nullable } from 'src/utils/nullish';

@InputType()
export class ElementsOrderByInput {
  @Field(() => Boolean)
  notImplemented: Nullable<boolean>;
}

@InputType()
export class ElementsFilterInput {
  @Field(() => Boolean, {
    nullable: true,
    description: 'Include all elements of the currently active user.',
  })
  isOwnerMe: Nullable<boolean>;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'Include all elements that are publicaly available to the logged-in user.',
  })
  isPublic: Nullable<boolean>;
}

@InputType()
export class ElementsQueryInput {
  @Field(() => ElementsFilterInput, { nullable: true })
  filter: ElementsFilterInput;

  @Field(() => ElementsOrderByInput, { nullable: true })
  orderBy: ElementsOrderByInput;

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  take: number;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;
}
