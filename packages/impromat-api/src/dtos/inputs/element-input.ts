import {
  Field,
  ID,
  InputType,
  Int,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import {
  IsIn,
  IsNotEmpty,
  IsUUID,
  Length,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { Nullable } from 'src/utils/nullish';
import { ElementVisibility } from '../types/element-visibility.dto';
import { IdInput } from './id-input';

@InputType()
export class ElementTagWhereInput {
  @Field(() => ID, { nullable: true })
  @ValidateIf((o) => !o.name || o.id)
  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.id || o.name)
  @IsNotEmpty()
  name: string;
}

@InputType()
export class ElementTagSetInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}

@InputType()
export class ElementTagsInput {
  @Field(() => [ElementTagSetInput], {
    description: 'Defines all tags of the element.',
  })
  @IsNotEmpty()
  set: ElementTagSetInput[];
}

@InputType()
export class CreateElementInput {
  @Field(() => String)
  @MaxLength(500)
  name: string;

  @Field(() => String, { nullable: true })
  @MaxLength(10000)
  markdown: Nullable<string>;

  @Field(() => String, {
    description: 'Language code (e.g. en, de) of the element.',
  })
  @Length(2)
  @IsIn(['en', 'de'])
  languageCode: string;

  @Field(() => String, { nullable: true })
  sourceUrl?: string | undefined;

  @Field(() => String, { defaultValue: 'impromat' })
  sourceName: string;

  @Field(() => String, { nullable: true })
  sourceBaseUrl?: string | undefined;

  @Field(() => String, { nullable: true })
  licenseName?: string | undefined;

  @Field(() => String, { nullable: true })
  licenseUrl?: string | undefined;

  @Field(() => String, {
    nullable: true,
    description:
      'Set if the element was imported from improbib, a project that collects existing improv resources.',
  })
  improbibIdentifier?: string | undefined;

  @Field(() => ElementVisibility)
  visibility: ElementVisibility;

  @Field(() => Int, { nullable: true })
  orderIndex?: number;

  @Field(() => ElementTagsInput, { nullable: true })
  tags: ElementTagsInput;

  @Field(() => Boolean, {
    nullable: true,
  })
  setPredictedLevelTags?: boolean;
}

@InputType()
export class UpdateElementInput extends IntersectionType(
  PartialType(CreateElementInput),
  IdInput,
) {}
