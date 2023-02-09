import { Inject, Session, UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { GraphQLAuthGuard } from 'src/auth/auth.guard';
import { Workshop } from 'src/dtos/workshop.dto';
import { PrismaService } from 'src/services/prisma.service';

// @InputType()
// class UserUniqueInput {
//   @Field({ nullable: true })
//   id: number;

//   @Field({ nullable: true })
//   email: string;
// }

@Resolver(Workshop)
@UseGuards(GraphQLAuthGuard)
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
  async userWorkshops(@Context() ctx, @Session() session: Record<string, any>) {
    return this.prismaService.user
      .findUnique({ where: { id: 'test' } })
      .workshops();
  }
}
