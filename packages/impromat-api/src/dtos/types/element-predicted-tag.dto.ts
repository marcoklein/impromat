import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Predicted tag for an element.' })
export class ElementPredictedTag {
  @Field(() => String, { description: 'Name of the predicted tag.' })
  name: string;

  @Field(() => String, { description: 'Reason for the predicted tag.' })
  reason: string;
}
