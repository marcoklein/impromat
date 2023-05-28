import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType({ description: 'Filter tags of elements.' })
export class ElementTagsFilterInput {
  @Field(() => String, { nullable: true })
  @MaxLength(100)
  text?: string;
}
