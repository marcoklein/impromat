import { Inject, UseGuards } from '@nestjs/common';
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
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { UpdateUserInput } from 'src/dtos/inputs/update-user-input';
import { UserElementsFilterInput } from 'src/dtos/inputs/user-elements-filter-input';
import { UserWorkshopsFilterInput } from 'src/dtos/inputs/user-workshops-filter-input';
import { UserFavoriteElementDto } from 'src/dtos/types/user-favorite-element.dto';
import { UserLikedWorkshopDto } from 'src/dtos/types/user-liked-workshop.dto';
import { User, UserDtoComputedFields } from 'src/dtos/types/user.dto';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { UserElementsService } from '../services/user-elements.service';

@Resolver(User)
@UseGuards(GraphqlAuthGuard)
export class MeResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private userElementsService: UserElementsService,
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
      defaultValue: { liked: true, owned: true },
    })
    input: UserWorkshopsFilterInput,
  ) {
    const { liked, owned } = input;
    const ownedFilter: Prisma.WorkshopWhereInput = { ownerId: user.id };
    const likedFilter: Prisma.WorkshopWhereInput = {
      userLikedWorkshops: { some: { userId: user.id } },
    };
    const filter: Prisma.WorkshopWhereInput = {
      OR: [owned ? ownedFilter : {}, liked ? likedFilter : {}],
    };
    return this.prismaService.workshop.findMany({
      where: filter,
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  @ResolveField()
  async elements(
    @SessionUserId() userSessionId: string | undefined,
    @Parent() user: User,
    @Args('input', {
      type: () => UserElementsFilterInput,
      defaultValue: { liked: true, owned: true },
    })
    input: UserElementsFilterInput,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 20 }) take: number,
  ) {
    return this.userElementsService.searchElements(userSessionId, user, input, {
      skip,
      take,
    });
  }

  @Query(() => User, {
    description: 'Get information about the current user.',
  })
  async me(
    @SessionUserId() userId: string,
  ): Promise<Omit<User, UserDtoComputedFields> | null> {
    return this.findUserById(userId);
  }

  @Query(() => User, {
    description: 'Get information about the user with given id',
  })
  async user(
    @SessionUserId() userId: string,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Omit<User, UserDtoComputedFields> | null> {
    // TODO differentiate if this is the own user, a public user, or an authenticated other user
    if (userId === id) {
      return this.findUserById(id);
    }
    throw new Error('Requesting other users is not implemented yet.');
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input')
    updateUserInput: UpdateUserInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Omit<User, UserDtoComputedFields>> {
    if (updateUserInput.id !== sessionUserId) {
      throw new Error('Not Authorized');
    }
    const result = await this.prismaService.user.update({
      data: { name: updateUserInput.name },
      where: { id: sessionUserId },
    });
    return result;
  }

  private findUserById(userId: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
