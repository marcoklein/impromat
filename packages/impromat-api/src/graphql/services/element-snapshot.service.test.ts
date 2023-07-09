import { accessibleBy } from '@casl/prisma';
import { Test } from '@nestjs/testing';
import { Element } from '@prisma/client';
import { PaginationArgs } from 'src/dtos/args/pagination-args';
import {
  ABILITY_ACTION_LIST,
  ABILITY_ACTION_READ,
  AppAbility,
  defineAbilityForUser,
} from 'src/graphql/abilities';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { ElementSnapshotService } from './element-snapshot.service';
import { PrismaService } from './prisma.service';

describe('ElementSnapshotService', () => {
  let service: ElementSnapshotService;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ElementSnapshotService, PrismaServiceMockProvider],
    }).compile();

    service = moduleRef.get(ElementSnapshotService);
    prismaService = moduleRef.get(PrismaService);
  });

  // given
  let userRequestId: undefined | string;
  let ability: AppAbility;

  beforeEach(() => {
    userRequestId = 'test-user';
    ability = defineAbilityForUser(userRequestId);
  });

  describe('findElementSnapshotById', () => {
    it('should trigger the correct SQL', async () => {
      // given
      const elementSnapshotId = 'test-element-snapshot';
      const findFirstMock = prismaService.element.findFirstOrThrow;
      // when
      await service.findElementSnapshotById(userRequestId, elementSnapshotId);
      // then
      expect(findFirstMock.mock.calls[0][0]).toEqual({
        where: {
          AND: [
            accessibleBy(ability, ABILITY_ACTION_READ).Element,
            { id: elementSnapshotId },
          ],
        },
      });
    });
  });

  describe('findElementSnapshots', () => {
    it('should trigger the correct SQL', async () => {
      // given
      const elementId = 'test-element';
      const paginationArgs: PaginationArgs = {
        skip: 0,
        take: 20,
      };
      const findManyMock = prismaService.element.findMany;
      findManyMock.mockResolvedValueOnce([
        {
          createdAt: new Date(),
          id: 'snapshot-id',
        } as Element,
      ]);
      // when
      await service.findElementSnapshots(
        userRequestId,
        elementId,
        paginationArgs,
      );
      // then
      expect(findManyMock.mock.calls[0][0]).toEqual({
        where: {
          AND: [
            accessibleBy(ability, ABILITY_ACTION_LIST).Element,
            { snapshotParentId: elementId },
          ],
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
        skip: 0,
        take: 20,
      });
    });
  });
});
