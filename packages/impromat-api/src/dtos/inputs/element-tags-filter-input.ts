import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  Length,
  MaxLength,
} from 'class-validator';

@InputType({ description: 'Filter tags of elements.' })
export class ElementTagsFilterInput {
  @Field(() => String, { nullable: true })
  @MaxLength(100)
  text?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @ArrayMaxSize(10)
  selectedTagNames?: string[];

  @Field(() => String, {
    description: 'Language code (e.g. en, de) for results.',
    nullable: true,
  })
  @Length(2)
  @IsIn(['en', 'de'])
  languageCode?: string;
}
