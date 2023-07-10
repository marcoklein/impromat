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
  @IsUUID(4)
  id?: string | undefined;

  @Field(() => String, { nullable: true })
  name?: string | undefined;
}

@InputType()
export class ElementTagSetInput {
  @Field(() => ID, { nullable: true })
  @IsUUID(4)
  @ValidateIf((o) => !o.name || o.id)
  @IsNotEmpty()
  id?: string | undefined;

  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.id || o.name)
  @IsNotEmpty()
  name?: string | undefined;
}

@InputType()
export class ElementTagsInput {
  @Field(() => [ElementTagWhereInput], { nullable: true })
  @ValidateIf((o) => !o.set || o.connect)
  @IsNotEmpty()
  connect: ElementTagWhereInput[] | undefined;

  @Field(() => [ElementTagSetInput], {
    nullable: true,
    description: 'Defines all tags of the element.',
  })
  @ValidateIf((o) => !o.connect || o.set)
  @IsNotEmpty()
  set: ElementTagSetInput[] | undefined;
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
    defaultValue: 'en',
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

  @Field(() => ElementVisibility, { defaultValue: ElementVisibility.PRIVATE })
  visibility: ElementVisibility;

  @Field(() => Int, { nullable: true })
  orderIndex?: number;

  @Field(() => ElementTagsInput, { nullable: true })
  tags: ElementTagsInput;
}

@InputType()
export class UpdateElementInput extends IntersectionType(
  PartialType(CreateElementInput),
  IdInput,
) {}
