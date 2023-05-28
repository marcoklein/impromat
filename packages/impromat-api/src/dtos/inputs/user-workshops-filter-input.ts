import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Filter workshops of user.' })
export class UserWorkshopsFilterInput {
  @Field(() => Boolean, { defaultValue: true })
  liked = true;

  @Field(() => Boolean, {
    defaultValue: true,
    description: 'Filter for workshops that are owned by the user.',
  })
  owned = true;
}
