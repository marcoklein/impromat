import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserFavoriteElementInput {
  @Field(() => ID)
  elementId: string;
  @Field(() => Boolean)
  isFavorite: boolean;
}
