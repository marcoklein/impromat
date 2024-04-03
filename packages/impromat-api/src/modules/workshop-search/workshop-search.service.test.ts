import { Test } from '@nestjs/testing';
import { Workshop } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { PrismaService } from '../database/prisma.service';
import { UserService } from '../user/user.service';
import { WorkshopSearchInput } from './workshop-search.input';
import { WorkshopSearchService } from './workshop-search.service';

describe('WorkshopSearchService', () => {
  let service: WorkshopSearchService;
  let prismaService: PrismaServiceMock;
  let userService: DeepMockProxy<UserService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        WorkshopSearchService,
        PrismaServiceMockProvider,
        { provide: UserService, useValue: mockDeep(UserService) },
      ],
    }).compile();

    service = moduleRef.get(WorkshopSearchService);
    prismaService = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);
  });

  describe('given no user', () => {
    it('should return all existing workshops for empty text', async () => {
      // given
      const dbWorkshops = [{ id: '1' }, { id: '2' }] as Workshop[];
      jest
        .spyOn(prismaService.workshop, 'findMany')
        .mockResolvedValue(dbWorkshops);
      // when
      const result = await service.searchWorkshops(
        undefined,
        {},
        {
          take: 20,
          skip: 0,
        },
      );
      // then
      expect(result).toHaveLength(2);
    });
  });

  describe('getWorkshopsSearchWhereInput', () => {
    it('should return expected prisma query for public user', async () => {
      // given
      const user = null;
      const workshopSearchInput: WorkshopSearchInput = {};
      // when
      const result = service.getWorkshopsSearchWhereInput(
        user,
        workshopSearchInput,
      );
      // then
      expect(result).toEqual({
        AND: [
          { OR: [{ isListed: true }] },
          {},
          {
            sections: {
              every: {
                elements: {
                  every: { basedOn: { languageCode: { in: ['en', 'de'] } } },
                },
              },
            },
          },
        ],
      });
    });
  });
});
