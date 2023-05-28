import {
  Field,
  InputType,
  Int,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { IsIn, Length, MaxLength } from 'class-validator';
import { Nullable } from 'src/utils/nullish';
import { ElementVisibility } from '../types/element-visibility.dto';
import { IdInput } from './id-input';

@InputType()
export class CreateElementInput {
  @Field(() => String)
  @MaxLength(500)
  name: string;

  @Field(() => ElementVisibility, { defaultValue: ElementVisibility.PRIVATE })
  visibility: ElementVisibility;

  @Field(() => String, { nullable: true })
  @MaxLength(10000)
  markdown: Nullable<string>;

  @Field(() => String, {
    defaultValue: 'en',
    description: 'Language code (e.g. en, de) of the element.',
  })
  @Length(2)
  @IsIn(['en', 'de'])
  languageCode: string;

  @Field(() => Int, { nullable: true })
  orderIndex?: number;
}

@InputType()
export class UpdateElementInput extends IntersectionType(
  PartialType(CreateElementInput),
  IdInput,
) {}
