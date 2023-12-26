import { Injectable } from '@nestjs/common';
import { Workshop } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

/**
 * Service to mark elements of user as favorites.
 */
@Injectable()
export class UserLikedWorkshopsService {
  constructor(private prismaService: PrismaService) {}

  async findUserFavoriteWorkshops(userId: string) {
    // TODO validate that user is authorized to access ressource
    const result = await this.prismaService.userLikedWorkshop.findMany({
      where: {
        userId,
      },
      include: {
        workshop: true,
      },
    });
    return result.map((item) => item.workshop);
  }

  async updateLikedWorkshopOfUser(
    userId: string,
    workshopId: string,
    isFavorite: boolean,
  ): Promise<{ workshop: Workshop | null }> {
    // TODO validate that user is authorized to access ressource
    const existingConnection =
      await this.prismaService.userLikedWorkshop.findUnique({
        where: { userId_workshopId: { workshopId, userId } },
      });
    if (isFavorite && !existingConnection) {
      // if error is thrown here it indicates a request duplication
      return await this.prismaService.userLikedWorkshop.create({
        data: {
          userId,
          workshopId,
        },
        select: {
          workshop: true,
        },
      });
    } else if (!isFavorite && existingConnection) {
      return await this.prismaService.userLikedWorkshop.delete({
        where: { userId_workshopId: { workshopId, userId } },
        select: { workshop: true },
      });
    }
    return {
      workshop: await this.prismaService.workshop.findUnique({
        where: { id: workshopId },
      }),
    };
  }
}
