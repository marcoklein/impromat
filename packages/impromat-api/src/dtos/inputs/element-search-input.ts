import { Field, InputType, Int } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class ElementSearchInput {
  @Field(() => String, { nullable: true })
  @MaxLength(500)
  text?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @ArrayMaxSize(10)
  tagNames?: string[];

  @Field(() => String, {
    description: 'Language code (e.g. en, de) for results.',
    nullable: true,
  })
  @Length(2)
  @IsIn(['en', 'de'])
  languageCode?: string;

  @Field(() => Boolean, {
    description: 'Filter for liked elements of the user.',
    nullable: true,
  })
  isLiked?: boolean;

  @Field(() => Boolean, {
    description: 'Filter for elements of the user.',
    nullable: true,
  })
  isOwned?: boolean;

  @Field(() => Int, { defaultValue: 20 })
  @Min(1)
  @Max(100)
  take: number;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;
}
