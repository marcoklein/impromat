import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
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

  // TODO add count? (e.g. favoriteElementsCount)
  @Field(() => [UserFavoriteElementDto])
  favoriteElements: UserFavoriteElementDto[];

  @Field(() => String, {
    nullable: true,
    description: 'Public display name of the user.',
  })
  name: Nullable<string>;
}
