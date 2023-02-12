import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from './base.dto';

@ObjectType()
export class ElementTag extends BaseDto {
  @Field(() => String)
  name: string;
}
