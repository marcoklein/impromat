import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../enums/sort-order';
import { BoolFilter } from '../inputs/bool-filter';
import { StringFilter } from '../inputs/string-filter';
import { PaginationArgs } from './pagination-args';

@InputType()
export class UserLikedWorkshopWhereInput {
  @Field(() => StringFilter, { nullable: true })
  userId?: StringFilter | undefined;
}

@InputType()
export class UserLikedWorkshopListRelationFilter {
  @Field(() => UserLikedWorkshopWhereInput, {
    nullable: true,
  })
  every?: UserLikedWorkshopWhereInput | undefined;

  @Field(() => UserLikedWorkshopWhereInput, {
    nullable: true,
  })
  some?: UserLikedWorkshopWhereInput | undefined;

  @Field(() => UserLikedWorkshopWhereInput, {
    nullable: true,
  })
  none?: UserLikedWorkshopWhereInput | undefined;
}

@InputType()
export class WorkshopsWhereInput {
  @Field(() => [WorkshopsWhereInput], { nullable: true })
  AND?: WorkshopsWhereInput[] | undefined;
  @Field(() => [WorkshopsWhereInput], { nullable: true })
  OR?: WorkshopsWhereInput[] | undefined;
  @Field(() => [WorkshopsWhereInput], { nullable: true })
  NOT?: WorkshopsWhereInput[] | undefined;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter | undefined;
  @Field(() => StringFilter, { nullable: true })
  ownerId?: StringFilter | undefined;
  @Field(() => BoolFilter, { nullable: true })
  isPublic?: BoolFilter | undefined;
  @Field(() => BoolFilter, { nullable: true })
  isListed?: BoolFilter | undefined;

  @Field(() => UserLikedWorkshopListRelationFilter, { nullable: true })
  userLikedWorkshops?: UserLikedWorkshopListRelationFilter | undefined;
}

@InputType()
export class WorkshopsOrderByInput {
  @Field(() => SortOrder, {
    nullable: true,
  })
  updatedAt?: SortOrder | undefined;

  @Field(() => SortOrder, {
    nullable: true,
  })
  name?: SortOrder | undefined;

  @Field(() => SortOrder, {
    nullable: true,
  })
  createdAt?: SortOrder | undefined;
}

@ArgsType()
export class FindManyWorkshopsArgs extends PaginationArgs {
  @Field(() => WorkshopsWhereInput, {
    nullable: true,
  })
  where?: WorkshopsWhereInput | undefined;

  @Field(() => [WorkshopsOrderByInput], {
    nullable: true,
  })
  orderBy?: WorkshopsOrderByInput[] | undefined;
}
