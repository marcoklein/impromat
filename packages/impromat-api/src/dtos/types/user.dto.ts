import { Field, ObjectType } from '@nestjs/graphql';
import { Nullable } from 'src/utils/nullish';
import { BaseDto } from './base.dto';
import { ElementSearchResult } from './element-search-result.dto';
import { UserFavoriteElementDto } from './user-favorite-element.dto';
import { UserLikedWorkshopDto } from './user-liked-workshop.dto';
import { Workshop } from './workshop.dto';

export type UserDtoComputedFields =
  | 'workshops'
  | 'elements'
  | 'favoriteElements'
  | 'likedWorkshops';

@ObjectType()
export class User extends BaseDto {
  @Field(() => [Workshop], {
    description: 'All workshops that this user has access to.',
  })
  workshops: Workshop[];

  @Field(() => [ElementSearchResult], {
    description: 'Elements owned by this user.',
  })
  elements: ElementSearchResult[];

  @Field(() => [UserFavoriteElementDto], {
    deprecationReason: 'use elements() with a filter',
  })
  favoriteElements: UserFavoriteElementDto[];

  @Field(() => [UserLikedWorkshopDto], {
    deprecationReason: 'use workshops() with a filter',
  })
  likedWorkshops: UserLikedWorkshopDto[];

  @Field(() => String, {
    nullable: true,
    description: 'Public display name of the user.',
  })
  name: Nullable<string>;
}
