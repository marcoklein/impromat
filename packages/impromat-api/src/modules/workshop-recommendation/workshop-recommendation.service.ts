import { accessibleBy } from '@casl/prisma';
import { Inject } from '@nestjs/common';
import {
  ABILITY_ACTION_READ,
  defineAbilityForUser,
} from '../../graphql/abilities';
import { PrismaService } from '../database/prisma.service';
import { ElementRecommendationService } from '../element/element-recommendation.service';

export class WorkshopRecommendationService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private elementRecommendationService: ElementRecommendationService,
  ) {}

  async findElementRecommendations(
    userSessionId: string | undefined,
    workshopId: string,
  ) {
    const ability = defineAbilityForUser(userSessionId);
    const workshop = await this.prismaService.workshop.findFirstOrThrow({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_READ).Workshop,
          { id: workshopId },
        ],
      },
      include: {
        sections: {
          include: {
            elements: {
              include: {
                basedOn: true,
              },
            },
          },
        },
      },
    });
    const lastWorkshopElementId = workshop.sections.at(-1)?.elements.at(-1)
      ?.basedOn.id;
    if (!lastWorkshopElementId) return [];
    return await this.elementRecommendationService.findRecommendations(
      userSessionId,
      lastWorkshopElementId,
    );
  }
}
