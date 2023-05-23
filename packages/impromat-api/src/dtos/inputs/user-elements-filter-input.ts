import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType({ description: 'Filter elements of user.' })
export class UserElementsFilterInput {
  @Field(() => Boolean, {
    defaultValue: true,
    description: 'Include elements liked by the user.',
  })
  liked = true;

  @Field(() => Boolean, {
    defaultValue: true,
    description: 'Include public elements.',
  })
  public = true;

  @Field(() => Boolean, {
    defaultValue: true,
    description: 'Include elements owned by the user.',
  })
  owned = true;

  @Field(() => String, {
    nullable: true,
    description: 'Search elements by text.',
  })
  @MaxLength(500)
  searchText?: string;
}
