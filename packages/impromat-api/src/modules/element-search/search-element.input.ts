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
