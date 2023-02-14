import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { WorkshopElement } from './workshop-element.dto';
import { Workshop } from './workshop.dto';

@ObjectType()
export class WorkshopSection extends BaseDto {
  @Field(() => String, { nullable: true })
  name: Nullable<string>;

  @Field(() => String, { nullable: true })
  color: Nullable<string>;

  @Field(() => Boolean)
  isCollapsed: boolean;

  @Field(() => [WorkshopElement])
  elements: WorkshopElement[];

  @Field(() => Workshop)
  workshop: Workshop;

  @Field(() => Float)
  orderIndex: number;
}
