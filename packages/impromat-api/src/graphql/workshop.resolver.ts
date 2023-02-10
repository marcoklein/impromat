import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Workshop, WorkshopRelations } from 'src/dtos/workshop.dto';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { SessionUserId } from './session-user-id.decorator';

// @InputType()
// class UserUniqueInput {
//   @Field({ nullable: true })
//   id: number;

//   @Field({ nullable: true })
//   email: string;
// }

@Resolver(Workshop)
@UseGuards(GraphqlAuthGuard)
export class WorkshopResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  // @ResolveField()
  // async userWorkshops(
  //   @Root() workshop: WorkshopDto,
  //   @Context() ctx,
  // ): Promise<WorkshopDto[]> {
  //   return this.prismaService.user
  //     .findUnique({
  //       where: {
  //         id: workshop.id,
  //       },
  //     })
  //     .workshops();
  // }

  @Query(() => [Workshop])
  async userWorkshops(
    @SessionUserId() userId: string,
  ): Promise<Omit<Workshop, WorkshopRelations>[] | null> {
    return await this.prismaService.user
      .findUniqueOrThrow({
        where: { id: userId },
      })
      .workshops();
  }
}
