import { Field, InputType } from '@nestjs/graphql';
import { ArrayMaxSize, IsArray, MaxLength } from 'class-validator';

@InputType({ description: 'Filter tags of elements.' })
export class ElementTagsFilterInput {
  @Field(() => String, { nullable: true })
  @MaxLength(100)
  text?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @ArrayMaxSize(10)
  selectedTagNames?: string[];
}
