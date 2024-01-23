import { Field, InputType } from '@nestjs/graphql';
import { IsIn, Length, MaxLength } from 'class-validator';

@InputType()
export class ElementSearchV2Input {
  @Field(() => String, { nullable: true })
  @MaxLength(500)
  text?: string;

  @Field(() => String, {
    description: 'Language code (e.g. en, de) for results.',
    nullable: true,
  })
  @Length(2)
  @IsIn(['en', 'de'])
  languageCode?: string;
}
