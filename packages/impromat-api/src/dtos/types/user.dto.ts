import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from './base.dto';
import { Element } from './element.dto';
import { UserFavoriteElementDto } from './user-favorite-element.dto';
import { Workshop } from './workshop.dto';

export type UserRelations = 'workshops' | 'elements' | 'favoriteElements';

@ObjectType()
export class User extends BaseDto {
  @Field(() => [Workshop])
  workshops: Workshop[];

  @Field(() => [Element], { description: 'Elements owned by this user.' })
  elements: Element[];

  @Field(() => [UserFavoriteElementDto])
  favoriteElements: UserFavoriteElementDto[];
}
