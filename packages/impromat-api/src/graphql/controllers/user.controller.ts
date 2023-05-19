import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { UpdateUserInput } from 'src/dtos/inputs/update-user-input';
import { UserFavoriteElementDto } from 'src/dtos/types/user-favorite-element.dto';
import { UserLikedWorkshopDto } from 'src/dtos/types/user-liked-workshop.dto';
import { User, UserDtoComputedFields } from 'src/dtos/types/user.dto';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { SessionUserId } from '../../decorators/session-user-id.decorator';

@Resolver(User)
@UseGuards(GraphqlAuthGuard)
export class MeResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  async elements(@Parent() user: User) {
    return this.findUserById(user.id).elements();
  }

  @ResolveField(() => [UserFavoriteElementDto])
  async favoriteElements(@Parent() user: User) {
    return this.findUserById(user.id).favoriteElements();
  }

  @ResolveField(() => [UserLikedWorkshopDto])
  async likedWorkshops(@Parent() user: User) {
    return this.findUserById(user.id).likedWorkshops();
  }

  @ResolveField()
  async workshops(@Parent() user: User) {
    return this.prismaService.workshop.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          { userLikedWorkshops: { some: { userId: user.id } } },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      },
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
