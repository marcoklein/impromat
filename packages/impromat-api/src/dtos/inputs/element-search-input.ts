import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayMaxSize, IsArray, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class ElementSearchInput {
  @Field(() => String, { nullable: true })
  @MaxLength(500)
  text?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @ArrayMaxSize(10)
  tagNames?: string[];

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  take: number;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;
}
