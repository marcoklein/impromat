import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class SearchElementsInput {
  @Field(() => String)
  @MaxLength(500)
  text: string;
}
