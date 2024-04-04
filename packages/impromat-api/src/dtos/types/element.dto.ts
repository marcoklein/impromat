import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { ElementVisibility } from './element-visibility.dto';
import { User } from './user.dto';

export type ElementOmittedFields = 'visibility';

@ObjectType()
export class Element extends BaseDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  markdown: Nullable<string>;

  @Field(() => String, { nullable: true })
  languageCode: Nullable<string>;

  @Field(() => String, { nullable: true })
  sourceUrl: Nullable<string>;

  @Field(() => String, { nullable: true })
  sourceName: Nullable<string>;

  @Field(() => String, { nullable: true })
  sourceBaseUrl: Nullable<string>;

  @Field(() => String, { nullable: true })
  licenseName: Nullable<string>;

  @Field(() => String, { nullable: true })
  licenseUrl: Nullable<string>;

  @Field(() => String, {
    nullable: true,
    description:
      'Set if the element was imported from improbib, a project that collects existing improv resources.',
  })
  improbibIdentifier: Nullable<string>;

  @Field(() => ElementVisibility)
  visibility: ElementVisibility;
}

@ObjectType()
export class ElementSnapshot {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => User, {
    description: 'User that created the snapshot.',
    nullable: true,
  })
  user: Nullable<User>;

  @Field(() => Element, { description: 'Element of snapshot.' })
  element: Element;

  @Field(() => Element, {
    description: 'Element this snapshot was created of.',
  })
  parent: Element;
}
