import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Element } from '../../dtos/types/element.dto';

@ObjectType({
  description:
    'Contains information about the exact match of a search term in an element.',
})
export class ElementSearchMatch {
  @Field(() => String, {
    description:
      'Identifier of the matched field. E.g. "name", "markdown", or "tags".',
  })
  key: string;

  @Field(() => String, {
    description:
      'The matched text in of the field. Could be used for highlighting.',
  })
  value: string;
}

@ObjectType()
export class ElementSearchResult {
  @Field(() => Element)
  element: Element;

  @Field(() => Float)
  score: number;

  @Field(() => [ElementSearchMatch])
  matches: ElementSearchMatch[];
}
