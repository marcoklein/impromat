import { Inject, Injectable } from '@nestjs/common';

import { accessibleBy } from '@casl/prisma';
import { defineAbilityForUser } from '../../graphql/abilities';
import { PrismaService } from '../database/prisma.service';

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
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    const notInTags = [
      'game',
      'exercise',
      'warmup',
      'Spiel',
      'Übung',
      'Aufwärmspiel',
    ];
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
                tag: {
                  name: {
                    in: element.tags.map((relation) => relation.tag.name),
                    notIn: notInTags,
                  },
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
