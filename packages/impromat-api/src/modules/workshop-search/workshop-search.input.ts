import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

@InputType()
export class WorkshopSearchInput {
  @Field(() => Boolean, {
    nullable: true,
    description:
      'If true, only workshop created by the requesting user are returned. If false, only workshops not created by the requesting user are returned. If not set, all workshops are returned.',
  })
  ownWorkshop?: boolean;

  @Field(() => [String], {
    description: 'Language codes (e.g. en, de) to filter results by.',
    nullable: true,
  })
  @IsIn(['en', 'de'], { each: true })
  languageCodes?: string[];
}
