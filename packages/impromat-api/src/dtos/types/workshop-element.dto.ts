import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { WorkshopSection } from './workshop-section.dto';

export type WorkshopElementRelations = 'section' | 'basedOn';

@ObjectType()
export class WorkshopElement extends BaseDto {
  @Field(() => String, { nullable: true })
  note: Nullable<string>;

  @Field(() => WorkshopSection)
  section: WorkshopSection;
}
