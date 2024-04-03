import { Field, InputType } from '@nestjs/graphql';
import { IsIn, Length, MaxLength } from 'class-validator';

@InputType()
export class ElementSearchInput {
  @Field(() => String, {
    nullable: true,
    description:
      'Search text. See https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search#postgresql for search usage information.',
  })
  @MaxLength(500)
  text?: string;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'If true, only elements created by the requesting user are returned. If false, only elements not created by the requesting user are returned. If not set, all elements are returned.',
  })
  ownElement?: boolean;

  @Field(() => String, {
    description: 'Language code (e.g. en, de) for results.',
    nullable: true,
    deprecationReason: 'Use languageCodes instead.',
  })
  @Length(2)
  @IsIn(['en', 'de'])
  languageCode?: string;

  @Field(() => [String], {
    description: 'Language codes (e.g. en, de) to filter results by.',
    nullable: true,
  })
  @IsIn(['en', 'de'], { each: true })
  languageCodes?: string[];
}
