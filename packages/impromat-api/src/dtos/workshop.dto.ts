import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Workshop {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
