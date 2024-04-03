import { Test } from '@nestjs/testing';
import { Element } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { PrismaService } from '../database/prisma.service';
import { UserService } from '../user/user.service';
import { ElementSearchService } from './element-search.service';

describe('ElementSearchService', () => {
  let service: ElementSearchService;
  let prismaService: PrismaServiceMock;
  let userService: DeepMockProxy<UserService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ElementSearchService,
        PrismaServiceMockProvider,
        { provide: UserService, useValue: mockDeep(UserService) },
      ],
    }).compile();

    service = moduleRef.get(ElementSearchService);
    prismaService = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);
  });

  describe('given no user', () => {
    it('should return all existing elements for empty text', async () => {
      // given
      const searchText = undefined;
      const dbElements = [{ id: '1' }, { id: '2' }] as Element[];
      jest
        .spyOn(prismaService.element, 'findMany')
        .mockResolvedValue(dbElements);
      // when
      const result = await service.searchElements(
        undefined,
        {
          text: searchText,
        },
        { take: 20, skip: 0 },
      );
      // then
      expect(result).toHaveLength(2);
    });
  });
});
