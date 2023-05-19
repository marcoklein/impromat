import { Field, ObjectType } from '@nestjs/graphql';
import { Workshop } from './workshop.dto';

@ObjectType('UserLikedWorkshop')
export class UserLikedWorkshopDto {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Workshop)
  workshop: Workshop;
}
