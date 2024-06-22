import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import DataLoader from 'dataloader';
import { AppAbility, defineAbilityForUser } from 'src/graphql/abilities';
import { DataLoaderContext } from './dataloader-context.interface';
import { DataLoaderStatsBuilder } from './dataloader-stats';
import { PrismaService } from './prisma.service';

@Injectable()
export class DataloaderService {
  private readonly logger = new Logger(DataloaderService.name);

  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async createLoadersWithUserId(
    unverifiedUserSessionId: string | undefined,
  ): Promise<DataLoaderContext> {
    const stats = new DataLoaderStatsBuilder();
    this.logger.debug(
      `Creating loaders with user id: ${unverifiedUserSessionId}`,
    );
    const currentUser = await this.loadAndVerifyUser(
      unverifiedUserSessionId,
      stats,
    );
    const ability = defineAbilityForUser(currentUser?.id);
    const userLoader = this.createUsersLoader(ability, stats);
    if (unverifiedUserSessionId) {
      userLoader.prime(unverifiedUserSessionId, currentUser);
      this.logger.debug(
        `Primed user loader with user id: "${unverifiedUserSessionId}"`,
      );
    }
    return {
      currentUser,
      userAbility: ability,
      users: userLoader,
      workshops: this.createWorkshopsLoader(ability, stats),
      userLikedWorkshops: this.createUserLikedWorkshopsLoader(ability, stats),
      workshopSections: this.createWorkshopSectionsLoader(ability, stats),
      stats,
    };
  }

  private async loadAndVerifyUser(
    unverifiedUserSessionId: string | undefined,
    stats: DataLoaderStatsBuilder,
  ): Promise<User | undefined> {
    if (!unverifiedUserSessionId) {
      return undefined;
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        id: unverifiedUserSessionId,
      },
    });
    stats.increaseQueryCount('users');
    if (!user) {
      this.logger.error(`User with id ${unverifiedUserSessionId} not found.`);
      this.logger.error(
        'User from session not found. This might indicate an unintended deletion of a user or that a client has tampered with the session data.',
      );
      throw new Error('User from session not found');
    }
    return user;
  }

  private createUsersLoader(
    ability: AppAbility,
    stats: DataLoaderStatsBuilder,
  ) {
    return new DataLoader(async (keys: string[]) => {
      this.logger.debug(`Fetching users with ids: ${keys.join(', ')}`);
      const users = await this.prismaService.user.findMany({
        where: {
          AND: [
            accessibleBy(ability).User,
            {
              id: {
                in: keys,
              },
            },
          ],
        },
      });
      stats.increaseQueryCount('users');
      return keys.map((key) => users.find((user) => user.id === key));
    });
  }

  private createWorkshopsLoader(
    ability: AppAbility,
    stats: DataLoaderStatsBuilder,
  ) {
    return new DataLoader(async (keys: string[]) => {
      this.logger.debug(`Fetching workshops with ids: ${keys.join(', ')}`);
      const workshops = await this.prismaService.workshop.findMany({
        where: {
          AND: [
            accessibleBy(ability).Workshop,
            {
              id: {
                in: keys,
              },
            },
          ],
        },
      });
      stats.increaseQueryCount('workshops');
      return keys.map((key) =>
        workshops.find((workshop) => workshop.id === key),
      );
    });
  }

  private createWorkshopSectionsLoader(
    ability: AppAbility,
    stats: DataLoaderStatsBuilder,
  ) {
    return new DataLoader(async (keys: string[]) => {
      this.logger.debug(
        `Fetching workshop sections with ids: ${keys.join(', ')}`,
      );
      const workshopSections =
        await this.prismaService.workshopSection.findMany({
          where: {
            AND: [
              accessibleBy(ability).WorkshopSection,
              {
                id: {
                  in: keys,
                },
              },
            ],
          },
        });
      stats.increaseQueryCount('workshopSections');
      return keys.map((key) =>
        workshopSections.find((section) => section.id === key),
      );
    });
  }

  private createUserLikedWorkshopsLoader(
    ability: AppAbility,
    stats: DataLoaderStatsBuilder,
  ) {
    return new DataLoader(async (keys: string[]) => {
      this.logger.debug(
        `Fetching liked workshops for users with ids: ${keys.join(', ')}`,
      );
      const userLikedWorkshops = await this.prismaService.user.findMany({
        where: {
          AND: [
            accessibleBy(ability).User,
            {
              id: {
                in: keys,
              },
            },
          ],
        },
        include: {
          likedWorkshops: true,
        },
      });
      stats.increaseQueryCount('userLikedWorkshops');

      return keys.map((key) => {
        const likedWorkshop = userLikedWorkshops.find(
          (user) => user.id === key,
        );
        return likedWorkshop?.likedWorkshops ?? [];
      });
    });
  }
}
