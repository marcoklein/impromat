import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseDto {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int)
  version: number;

  @Field(() => Boolean, { nullable: true })
  deleted?: boolean;
}
