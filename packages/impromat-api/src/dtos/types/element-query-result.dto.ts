import { Field, ObjectType } from '@nestjs/graphql';
import { Element } from './element.dto';

@ObjectType()
export class ElementQueryResult {
  @Field(() => Element)
  element: Element;
}
