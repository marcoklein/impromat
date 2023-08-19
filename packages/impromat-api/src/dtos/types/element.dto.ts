import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { ElementTag } from './element-tag.dto';
import { ElementVisibility } from './element-visibility.dto';
import { User } from './user.dto';
import { WorkshopElement } from './workshop-element.dto';

export type ElementOmittedFields =
  | 'tags'
  | 'usedBy'
  | 'owner'
  | 'visibility'
  | 'isFavorite'
  | 'markdownShort'
  | 'snapshots'
  | 'isOwnerMe'
  | 'recommendations';

@ObjectType()
export class Element extends BaseDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  markdown: Nullable<string>;

  @Field(() => String, {
    nullable: true,
    description:
      'Shortened markdown text for preview purposes to avoid loading the whole content in a request.',
  })
  markdownShort: Nullable<string>;

  @Field(() => [ElementTag])
  tags: ElementTag[];

  @Field(() => [WorkshopElement])
  usedBy: WorkshopElement[];

  @Field(() => [Element])
  recommendations: Element[];

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

  @Field(() => User, { nullable: true })
  owner: Nullable<User>;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'Convenience field to determine if the owner of the element is the logged in user.',
  })
  isOwnerMe: Nullable<boolean>;

  @Field(() => ElementVisibility)
  visibility: ElementVisibility;

  // TODO separate types to add an element with me context fields?
  @Field(() => Boolean, {
    nullable: true,
    description: 'Set if the element is called from a user context.',
  })
  isFavorite: Nullable<boolean>;

  @Field(() => [ElementSnapshot], { description: 'Changes of the element.' })
  snapshots: ElementSnapshot[];
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
}
