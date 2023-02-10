import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from './base.dto';
import { Element } from './element.dto';
import { Workshop } from './workshop.dto';

@ObjectType()
export class WorkshopSection extends BaseDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;

  @Field(() => Boolean)
  isVisible: boolean;

  @Field(() => Boolean)
  isCollapsed: boolean;

  @Field(() => [Element])
  elements: Element[];

  @Field(() => Workshop)
  workshop: Workshop;
}
