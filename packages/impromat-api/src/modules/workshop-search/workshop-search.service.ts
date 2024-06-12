import { accessibleBy } from '@casl/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from 'prisma/prisma-client';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import {
  ABILITY_ACTION_LIST,
  defineAbilityForUser,
} from 'src/graphql/abilities';
import { PrismaService } from '../database/prisma.service';
import { WorkshopSearchResult } from './workshop-search-result.dto';
import { WorkshopSearchInput } from './workshop-search.input';

@Injectable()
export class WorkshopSearchService {
  private readonly logger = new Logger(WorkshopSearchService.name);

  constructor(private prismaService: PrismaService) {}

  async searchWorkshops(
    userRequestId: string | undefined,
    elementSearchInput: WorkshopSearchInput,
    paginationArgs: PaginationArgs,
  ): Promise<WorkshopSearchResult[]> {
    // const ability = defineAbilityForUser(userRequestId);
    const user = !userRequestId
      ? null
      : await this.prismaService.user.findUnique({
          where: { id: userRequestId },
        });

    const baseWhereInput = this.getWorkshopsSearchWhereInput(
      user,
      elementSearchInput,
    );
    this.logger.debug('baseWhereInput: ' + JSON.stringify(baseWhereInput));

    const orderByQuery: Prisma.WorkshopFindManyArgs = {
      orderBy: [
        {
          updatedAt: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    };
    const prismaQuery: Prisma.WorkshopFindManyArgs = {
      where: baseWhereInput,
      ...orderByQuery,
      include: {
        sections: {
          // access to workshop implicitly allows reading of sections and elements
          // where: accessibleBy(ability).WorkshopSection,
          include: {
            elements: {
              // where: accessibleBy(ability).WorkshopElement,
              include: {
                basedOn: true,
              },
            },
          },
        },
      },
      take: paginationArgs.take,
      skip: paginationArgs.skip,
    };
    const results = await this.prismaService.workshop.findMany(prismaQuery);

    return results.map((workshop) => ({
      workshop,
    }));
  }

  /**
   * Returns base Prisma query object that is used for searching workshops.
   *
   * @param user Authenticated user object if available.
   * @param input Search input.
   */
  getWorkshopsSearchWhereInput(user: User | null, input: WorkshopSearchInput) {
    const ability = defineAbilityForUser(user?.id);

    const languageCodes = input.languageCodes ?? user?.languageCodes;
    let languagesFilter: Prisma.WorkshopWhereInput = {};
    if (languageCodes) {
      languagesFilter = {
        sections: {
          every: {
            elements: {
              every: {
                basedOn: {
                  languageCode: {
                    in: languageCodes,
                  },
                },
              },
            },
          },
        },
      };
    }

    let ownWorkshopFilter: Prisma.WorkshopWhereInput = {};
    if (user && input.ownWorkshop === true) {
      ownWorkshopFilter = {
        ownerId: user.id,
      };
    }

    const accessibleElementsQuery: Prisma.WorkshopWhereInput = {
      AND: [
        accessibleBy(ability, ABILITY_ACTION_LIST).Workshop,
        ownWorkshopFilter,
        languagesFilter,
      ],
    };

    return accessibleElementsQuery;
  }
}
