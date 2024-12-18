import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserLikedWorkshop as PrismaUserLikedWorkshop } from '@prisma/client';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { UpdateUserLikedWorkshopInput } from 'src/dtos/inputs/update-liked-workshop-input';
import { UserLikedWorkshopDto } from 'src/dtos/types/user-liked-workshop.dto';
import { Workshop } from 'src/dtos/types/workshop.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { PrismaService } from '../database/prisma.service';
import { UserLikedWorkshopsService } from './user-liked-workshops.service';

@Resolver(UserLikedWorkshopDto)
@UseGuards(GraphqlAuthGuard)
export class UserLikedWorkshopController {
  constructor(
    private prismaService: PrismaService,
    private userLikedWorkshopsService: UserLikedWorkshopsService,
  ) {}

  @ResolveField(() => Workshop)
  async workshop(
    @Parent() userFavoriteElementDto: PrismaUserLikedWorkshop,
    @SessionUserId() userSessionId: string,
  ) {
    return this.prismaService.userLikedWorkshop
      .findUniqueOrThrow({
        where: {
          userId_workshopId: {
            userId: userSessionId,
            workshopId: userFavoriteElementDto.workshopId,
          },
        },
      })
      .workshop();
  }

  @Mutation(() => Workshop, {
    nullable: true,
    description: 'Change the liked state for workshop of the logged in user.',
  })
  async updateUserLikedWorkshop(
    @Args('input')
    updateUserLikedWorkshopInput: UpdateUserLikedWorkshopInput,
    @SessionUserId() sessionUserId: string,
  ): Promise<Workshop | null> {
    const result =
      await this.userLikedWorkshopsService.updateLikedWorkshopOfUser(
        sessionUserId,
        updateUserLikedWorkshopInput.workshopId,
        updateUserLikedWorkshopInput.isLiked,
      );
    return result?.workshop;
  }
}
