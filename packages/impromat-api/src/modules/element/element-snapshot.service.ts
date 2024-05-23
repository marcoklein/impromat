import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

import { subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import { ElementSnapshot } from 'src/dtos/types/element.dto';
import {
  ABILITY_ACTION_LIST,
  ABILITY_ACTION_READ,
  defineAbilityForUser,
} from '../../graphql/abilities';

@Injectable()
export class ElementSnapshotService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findElementSnapshotById(userRequestId: string | undefined, id: string) {
    const ability = defineAbilityForUser(userRequestId);
    const element = await this.prismaService.element.findUnique({
      where: {
        id,
      },
    });
    if (!element) return null;
    if (ability.can(ABILITY_ACTION_READ, subject('Element', element))) {
      return element;
    }
    return null;
  }

  async findElementSnapshotUser(
    elementSnapshot: ElementSnapshot,
    userRequestId?: string,
  ) {
    const ability = defineAbilityForUser(userRequestId);
    const user = await this.prismaService.element
      .findUnique({
        where: {
          id: elementSnapshot.id,
        },
      })
      .snapshotUser({
        where: accessibleBy(ability, ABILITY_ACTION_READ).User,
      });
    return user;
  }

  async findElementSnapshotParent(
    elementSnapshot: ElementSnapshot,
    userRequestId?: string,
  ) {
    const ability = defineAbilityForUser(userRequestId);
    const parent = await this.prismaService.element
      .findUnique({
        where: {
          id: elementSnapshot.id,
        },
      })
      .snapshotParent({
        where: accessibleBy(ability, ABILITY_ACTION_READ).Element,
      });
    return parent;
  }

  async findElementSnapshots(
    userRequestId: string | undefined,
    elementId: string,
    paginationArgs: PaginationArgs,
  ): Promise<Partial<ElementSnapshot>[]> {
    const ability = defineAbilityForUser(userRequestId);
    const dbSnapshots = await this.prismaService.element
      .findUnique({
        where: {
          id: elementId,
        },
      })
      .snapshots({
        where: accessibleBy(ability, ABILITY_ACTION_LIST).Element,
        orderBy: [
          {
            createdAt: 'desc',
          },
          { id: 'asc' },
        ],
        ...paginationArgs,
      });

    return dbSnapshots ?? [];
  }
}
