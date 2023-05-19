import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserLikedWorkshopInput {
  @Field(() => ID)
  workshopId: string;
  @Field(() => Boolean)
  isLiked: boolean;
}
