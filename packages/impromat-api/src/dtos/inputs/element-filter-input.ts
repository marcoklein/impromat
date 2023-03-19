import { InputType, Field, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class ElementFilterInput {
  @Field(() => String)
  @MaxLength(500)
  name: string;

  @Field(() => Int, { nullable: true })
  orderIndex?: number;
}
