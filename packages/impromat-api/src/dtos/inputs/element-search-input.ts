import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, MaxLength, Min } from 'class-validator';

@InputType()
export class ElementSearchInput {
  @Field(() => String, {
    nullable: true,
    deprecationReason: 'Use user.elements(searchText) instead',
  })
  @MaxLength(500)
  text?: string;

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  take: number;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;
}
