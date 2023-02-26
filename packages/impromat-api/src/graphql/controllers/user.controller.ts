import { Inject, UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { UserFavoriteElementDto } from 'src/dtos/types/user-favorite-element.dto';
import { User, UserRelations } from 'src/dtos/types/user.dto';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { UserFavoriteElementsService } from 'src/graphql/services/user-favorite-elements.service';
import { SessionUserId } from '../../decorators/session-user-id.decorator';

@Resolver(User)
@UseGuards(GraphqlAuthGuard)
export class MeResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private userFavoriteElementsService: UserFavoriteElementsService,
  ) {}

  @ResolveField()
  async elements(@Parent() user: User) {
    return this.findUserById(user.id).elements();
  }

  @ResolveField(() => [UserFavoriteElementDto])
  async favoriteElements(@Parent() user: User) {
    return this.findUserById(user.id).favoriteElements();
  }

  @ResolveField()
  async workshops(@Parent() user: User) {
    return this.findUserById(user.id).workshops();
  }

  @Query(() => User, {
    description: 'Get information about the current user.',
  })
  async me(
    @SessionUserId() userId: string,
  ): Promise<Omit<User, UserRelations> | null> {
    return this.findUserById(userId);
  }

  private findUserById(userId: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
