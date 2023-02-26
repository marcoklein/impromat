import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from './base.dto';
import { Element } from './element.dto';

export type UserFavoriteElementRelations = 'tags' | 'usedBy' | 'owner';

@ObjectType('UserFavoriteElement')
export class UserFavoriteElementDto extends BaseDto {
  @Field(() => Element)
  element: Element;
}
