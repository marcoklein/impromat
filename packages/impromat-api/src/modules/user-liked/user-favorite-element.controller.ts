import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserFavoriteElement as PrismaUserFavoriteElement } from '@prisma/client';
import { Element } from 'src/dtos/types/element.dto';
import { UserFavoriteElementDto } from 'src/dtos/types/user-favorite-element.dto';
import { SessionUserId } from '../../decorators/session-user-id.decorator';
import { PrismaService } from '../database/prisma.service';

@Resolver(UserFavoriteElementDto)
export class UserFavoriteElementController {
  constructor(private prismaService: PrismaService) {}

  @ResolveField(() => Element)
  async element(
    @Parent() userFavoriteElementDto: PrismaUserFavoriteElement,
    @SessionUserId() userSessionId: string | undefined,
  ) {
    if (!userSessionId) {
      return null;
    }
    return this.prismaService.userFavoriteElement
      .findUniqueOrThrow({
        where: {
          userId_elementId: {
            elementId: userFavoriteElementDto.elementId,
            userId: userSessionId,
          },
        },
      })
      .element();
  }
}
