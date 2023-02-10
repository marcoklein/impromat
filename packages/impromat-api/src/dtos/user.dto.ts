import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Workshop } from './workshop.dto';

export type UserRelations = 'workshops';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Workshop])
  workshops: Workshop[];
}
