import { Inject, UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { User, UserRelations } from 'src/dtos/user.dto';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { UserSessionService } from './services/user-session.service';
import { SessionUserId } from './session-user-id.decorator';

@Resolver(User)
@UseGuards(GraphqlAuthGuard)
export class MeResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private userSessionService: UserSessionService,
  ) {}

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
    return await this.findUserById(userId);
  }

  private findUserById(userId: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
