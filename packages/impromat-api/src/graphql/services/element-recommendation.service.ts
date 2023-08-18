import { Inject, Injectable } from '@nestjs/common';

import { accessibleBy } from '@casl/prisma';
import { defineAbilityForUser } from '../abilities';
import { PrismaService } from './prisma.service';

@Injectable()
export class ElementRecommendationService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findRecommendations(
    userRequestId: string | undefined,
    elementId: string,
  ) {
    const ability = defineAbilityForUser(userRequestId);

    const element = await this.prismaService.element.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability).Element, { id: elementId }],
      },
      include: {
        tags: true,
      },
    });

    const recommendations = await this.prismaService.element.findMany({
      where: {
        AND: [
          accessibleBy(ability).Element,
          {
            id: {
              not: elementId,
            },
            languageCode: element.languageCode,
            tags: {
              some: {
                name: {
                  in: element.tags.map((tag) => tag.name),
                  notIn: [
                    'game',
                    'exercise',
                    'warmup',
                    'Spiel',
                    'Übung',
                    'Aufwärmspiel',
                  ],
                },
              },
            },
            visibility: 'PUBLIC',
          },
        ],
      },
      take: 3,
    });

    return recommendations;
  }
}
