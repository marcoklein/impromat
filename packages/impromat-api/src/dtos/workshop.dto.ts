import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/nullish';

@ObjectType()
export class Workshop {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: Nullable<string>;
}
