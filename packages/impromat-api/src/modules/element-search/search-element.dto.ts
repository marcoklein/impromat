import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SimilarKeyword {
  @Field(() => String)
  keyword: string;

  @Field(() => Float)
  score: number;
}

@ObjectType()
export class ElementSearchKeywords {
  @Field(() => [ElementSearchKeyword])
  keywords: ElementSearchKeyword[];

  @Field(() => Int)
  uniqueKeywordsCount: number;

  @Field(() => Int)
  documentsCount: number;

  @Field(() => [SimilarKeyword], { nullable: true })
  similarKeywords?: SimilarKeyword[];
}

@ObjectType()
export class ElementSearchKeyword {
  @Field(() => String, {
    description: 'The keyword in its stemmed form.',
  })
  keyword: string;

  @Field(() => Float, {
    description:
      'Inverse document frequency. Describes how important a word is to a document in a collection or corpus. The more common a word is in a document, the lower its idf.',
  })
  idf: number;

  @Field(() => [String], {
    nullable: true,
    description: 'The keyword in its original form(s) before stemming.',
  })
  originalKeywords?: string[];
}
