import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Element } from './element.dto';

@ObjectType()
export class ElementSearchResult {
  @Field(() => Element)
  element: Element;
  @Field(() => Float)
  score: number;
}
