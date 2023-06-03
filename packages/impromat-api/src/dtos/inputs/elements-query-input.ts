import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Nullable } from 'src/utils/nullish';

@InputType()
export class ElementsOrderByInput {
  @Field(() => Boolean)
  notImplemented: Nullable<boolean>;
}

@InputType({ description: 'Filter for elements' })
export class ElementsFilterInput {
  @Field(() => String, { nullable: true })
  @MaxLength(100)
  nameSearch: Nullable<string>;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Include all elements of the currently active user.',
  })
  isOwnerMe: Nullable<boolean>;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'Include all elements that are publicly available to the logged-in user.',
  })
  isPublic: Nullable<boolean>;
}
