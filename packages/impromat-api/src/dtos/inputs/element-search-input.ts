import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min } from 'class-validator';

@InputType()
export class ElementSearchInput {
  @Field(() => String, { nullable: true })
  @MaxLength(500)
  text?: string;

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  limit: number;
}
