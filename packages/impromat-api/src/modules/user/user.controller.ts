import { accessibleBy } from '@casl/prisma';
import { Inject } from '@nestjs/common';
import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UpdateUserInput } from 'src/dtos/inputs/update-user-input';
import { UserWorkshopsFilterInput } from 'src/dtos/inputs/user-workshops-filter-input';
import { UserFavoriteElementDto } from 'src/dtos/types/user-favorite-element.dto';
import { UserLikedWorkshopDto } from 'src/dtos/types/user-liked-workshop.dto';
import { User, UserDtoComputedFields } from 'src/dtos/types/user.dto';
import { PrismaService } from 'src/modules/database/prisma.service';
import { Nullable } from 'src/utils/nullish';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import {
  ABILITY_ACTION_LIST,
  defineAbilityForUser,
} from '../../graphql/abilities';
import { UserService } from './user.service';

@Resolver(User)
export class UserController {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  @ResolveField(() => [UserFavoriteElementDto])
  async favoriteElements(@Parent() user: User) {
    return this.findUserById(user.id).favoriteElements();
  }

  @ResolveField(() => [UserLikedWorkshopDto])
  async likedWorkshops(@Parent() user: User) {
    return this.findUserById(user.id).likedWorkshops();
  }

  @ResolveField()
  async workshops(
    @Parent() user: User,
    @Args('input', {
      type: () => UserWorkshopsFilterInput,
      nullable: true,
    })
    input: Nullable<UserWorkshopsFilterInput>,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 20 }) take: number,
  ) {
    const ability = defineAbilityForUser(user.id);
    const { liked, owned, isPublic, isCommunity } = input ?? {
      isCommunity: false,
      isPublic: true,
      liked: true,
      owned: true,
    };
    const ownedFilter: Prisma.WorkshopWhereInput = { ownerId: user.id };
    const sharedFilter: Prisma.WorkshopWhereInput = {
      AND: [ownedFilter, { OR: [{ isPublic: true }, { isListed: true }] }],
    };
    const communityFilter: Prisma.WorkshopWhereInput = {
      isListed: true,
    };
    const likedFilter: Prisma.WorkshopWhereInput = {
      userLikedWorkshops: { some: { userId: user.id } },
    };
    const filter: Prisma.WorkshopWhereInput = {
      OR: [
        owned ? ownedFilter : {},
        liked ? likedFilter : {},
        isPublic ? sharedFilter : {},
        isCommunity ? communityFilter : {},
      ],
    };
    return this.prismaService.workshop.findMany({
      where: {
        AND: [accessibleBy(ability, ABILITY_ACTION_LIST).Workshop, filter],
      },
      orderBy: [
        {
          updatedAt: 'desc',
        },
        { id: 'asc' },
      ],
      skip,
      take,
    });
  }

  @Query(() => User, {
    nullable: true,
    description:
      'Get information about a user. Returns null if not found or not logged in.',
  })
  async user(
    @SessionUserId() sessionUserId: string,
    @Args('id', { type: () => ID, nullable: true }) userId: string | undefined,
  ): Promise<Omit<User, UserDtoComputedFields> | null | undefined> {
    return this.userService.findUserById(sessionUserId, userId);
  }

  @Query(() => User, {
    description:
      'Get information about the current user. Returns null if not logged in.',
    nullable: true,
  })
  async me(
    @SessionUserId() userId: string,
  ): Promise<Omit<User, UserDtoComputedFields> | null | undefined> {
    return await this.userService.findUserById(userId, userId);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input')
    updateUserInput: UpdateUserInput,
    @SessionUserId() sessionUserId: string | undefined,
  ): Promise<Omit<User, UserDtoComputedFields>> {
    return this.userService.updateUser(sessionUserId, updateUserInput);
  }

  private findUserById(userId: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
