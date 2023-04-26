import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Element } from './element.dto';
import { Nullable } from 'src/utils/nullish';

@ObjectType()
export class ElementSearchMatch {
  @Field(() => String, {
    description: 'Key of field where searched text was found.',
    nullable: true,
  })
  key: Nullable<string>;

  @Field(() => [[Int]])
  indices: [number, number][];

  @Field(() => Int, {
    nullable: true,
    description:
      'If the matching field is an array this field points to the index of the matching element in the source array.',
  })
  refIndex: Nullable<number>;

  @Field(() => String)
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
