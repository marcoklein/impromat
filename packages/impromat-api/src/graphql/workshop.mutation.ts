import { Inject, UseGuards } from '@nestjs/common';
import { Args, Field, InputType, Mutation, Resolver } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Workshop, WorkshopRelations } from 'src/dtos/workshop.dto';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { SessionUserId } from './session-user-id.decorator';

@InputType()
class WorkshopInput {
  @Field(() => String)
  @Length(1, 500)
  name: string;

  @Field(() => String, { nullable: true })
  @MaxLength(10000)
  description?: string;
}

@Resolver()
@UseGuards(GraphqlAuthGuard)
export class WorkshopMutation {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Mutation(() => Workshop)
  async addWorkshop(
    @Args('workshop') workshopInput: WorkshopInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Omit<Workshop, WorkshopRelations>> {
    return this.prismaService.$transaction(async (tx) => {
      async function findOrCreate() {
        const user = await tx.user.findUnique({
          where: { id: sessionUserId },
        });
        if (user) return user;
        return await tx.user.create({
          data: { id: sessionUserId },
        });
      }
      const user = await findOrCreate();

      return tx.workshop.create({
        data: { ...workshopInput, ownerId: user.id },
      });
    });
  }
}
