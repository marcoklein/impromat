import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';

@ObjectType()
export class WorkshopSection extends BaseDto {
  @Field(() => String, { nullable: true })
  name: Nullable<string>;

  @Field(() => String, { nullable: true })
  color: Nullable<string>;

  @Field(() => Boolean)
  isCollapsed: boolean;

  @Field(() => Float)
  orderIndex: number;
}
