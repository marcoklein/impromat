import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { ElementTag } from './element-tag.dto';
import { User } from './user.dto';
import { WorkshopElement } from './workshop-element.dto';

export type ElementRelations = 'tags' | 'usedBy' | 'owner';

@ObjectType()
export class Element extends BaseDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  markdown: Nullable<string>;

  @Field(() => [ElementTag])
  tags: ElementTag[];

  @Field(() => [WorkshopElement])
  usedBy: WorkshopElement[];

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

  @Field(() => User, { nullable: true })
  owner: Nullable<User>;
}
