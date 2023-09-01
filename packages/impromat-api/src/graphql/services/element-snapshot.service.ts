import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

import { accessibleBy } from '@casl/prisma';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import {
  ABILITY_ACTION_LIST,
  ABILITY_ACTION_READ,
  defineAbilityForUser,
} from '../abilities';
import { ElementSnapshot } from 'src/dtos/types/element.dto';

@Injectable()
export class ElementSnapshotService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  findElementSnapshotById(userRequestId: string | undefined, id: string) {
    const ability = defineAbilityForUser(userRequestId);
    return this.prismaService.element.findFirstOrThrow({
      where: {
        AND: [accessibleBy(ability, ABILITY_ACTION_READ).Element, { id }],
      },
    });
  }

  /**
   * Returns all element snapshots of an element with given id
   *
   * @param userRequestId
   * @param elementId
   * @param paginationArgs
   * @returns
   */
  async findElementSnapshots(
    userRequestId: string | undefined,
    elementId: string,
    paginationArgs: PaginationArgs,
  ): Promise<Partial<ElementSnapshot>[]> {
    const ability = defineAbilityForUser(userRequestId);
    const dbSnapshots = await this.prismaService.element.findMany({
      where: {
        AND: [
          accessibleBy(ability, ABILITY_ACTION_LIST).Element,
          { snapshotParentId: elementId },
        ],
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        { id: 'asc' },
      ],
      ...paginationArgs,
    });
    return dbSnapshots;
  }
}
