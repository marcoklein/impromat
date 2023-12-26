import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { UserFavoriteElementDto } from './user-favorite-element.dto';
import { UserLikedWorkshopDto } from './user-liked-workshop.dto';
import { Workshop } from './workshop.dto';

export type UserDtoComputedFields =
  | 'workshops'
  | 'favoriteElements'
  | 'likedWorkshops';

@ObjectType()
export class User extends BaseDto {
  @Field(() => [Workshop], {
    description: 'All workshops that this user has access to.',
  })
  workshops: Workshop[];

  @Field(() => [UserFavoriteElementDto])
  favoriteElements: UserFavoriteElementDto[];

  @Field(() => [UserLikedWorkshopDto])
  likedWorkshops: UserLikedWorkshopDto[];

  @Field(() => String, {
    nullable: true,
    description: 'Public display name of the user.',
  })
  name: Nullable<string>;

  @Field(() => [String], {
    description: 'Preferred language codes of the user.',
    defaultValue: [],
  })
  languageCodes: string[];
}
