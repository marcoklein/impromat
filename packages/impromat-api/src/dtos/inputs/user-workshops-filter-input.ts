import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Filter workshops of user.' })
export class UserWorkshopsFilterInput {
  @Field(() => Boolean, { defaultValue: false })
  liked: boolean;

  @Field(() => Boolean, {
    defaultValue: false,
    description: 'Filter for workshops that are owned by the user.',
  })
  owned: boolean;

  @Field(() => Boolean, {
    defaultValue: false,
    description: 'Publicly or listed workshops of user.',
  })
  isPublic: boolean; // better call isShared

  @Field(() => Boolean, {
    defaultValue: false,
    description: 'Publicly accessible community workshop.',
  })
  isCommunity: boolean;
}
