import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Service to mark elements of user as favorites.
 */
@Injectable()
export class UserFavoriteElementsService {
  constructor(private prismaService: PrismaService) {}

  async findUserFavoriteElements(userId: string) {
    // TODO validate that user is authorized to access ressource
    const result = await this.prismaService.userFavoriteElement.findMany({
      where: {
        userId,
      },
      include: {
        element: true,
      },
    });
    return result.map((item) => item.element);
  }

  async updateFavoriteElementOfUser(
    userId: string,
    elementId: string,
    isFavorite: boolean,
  ) {
    // TODO validate that user is authorized to access ressource
    const existingConnection =
      await this.prismaService.userFavoriteElement.findUnique({
        where: { userId_elementId: { elementId, userId } },
      });
    if (isFavorite && !existingConnection) {
      await this.prismaService.userFavoriteElement.create({
        data: {
          userId,
          elementId,
        },
      });
    } else if (!isFavorite && existingConnection) {
      await this.prismaService.userFavoriteElement.delete({
        where: { userId_elementId: { elementId, userId } },
      });
    }
  }
}
