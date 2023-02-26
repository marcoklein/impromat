import { Field, ObjectType } from '@nestjs/graphql';
import { Element } from './element.dto';

export type UserFavoriteElementRelations = 'tags' | 'usedBy' | 'owner';

// TODO merge favorite element interim model directly with element and user
// and provide a "UserContext" element
@ObjectType('UserFavoriteElement')
export class UserFavoriteElementDto {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Element)
  element: Element;
}
