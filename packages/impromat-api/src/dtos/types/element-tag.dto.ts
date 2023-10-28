import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from './base.dto';

@ObjectType()
export class ElementTag extends BaseDto {
  @Field(() => String)
  name: string;

  @Field(() => Number, {
    description:
      'Number of elements that have this tag. If used as part of a filter query the number of elements that would match the filter.',
  })
  count: number;
}
