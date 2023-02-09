import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Workshop } from './workshop.dto';

@ObjectType({ description: 'Test' })
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Workshop])
  workshop: Workshop[];
}
