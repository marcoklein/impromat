import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { Element } from './element.dto';
import { WorkshopSection } from './workshop-section.dto';

export type WorkshopElementRelations = 'workshops';

@ObjectType()
export class WorkshopElement extends BaseDto {
  @Field(() => String, { nullable: true })
  note: Nullable<string>;

  @Field(() => Element)
  basedOn: Element;

  @Field(() => WorkshopSection, { nullable: true })
  section: Nullable<WorkshopSection>;
}
