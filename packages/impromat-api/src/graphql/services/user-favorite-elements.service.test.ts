import { Test } from '@nestjs/testing';
import { Element, UserFavoriteElement } from '@prisma/client';
import { UserFavoriteElementsService } from 'src/graphql/services/user-favorite-elements.service';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { PrismaService } from './prisma.service';

describe('UserFavoriteElementsService', () => {
  let service: UserFavoriteElementsService;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserFavoriteElementsService, PrismaServiceMockProvider],
    }).compile();

    service = moduleRef.get(UserFavoriteElementsService);
    prismaService = moduleRef.get(PrismaService);
  });

  it('should favorise an element', async () => {
    // given
    const userId = 'test-user';
    const elementId = 'test-element';
    const existingElementMock = jest
      .spyOn(prismaService.userFavoriteElement, 'findUnique')
      .mockResolvedValue(null).mock;
    const createMock = jest
      .spyOn(prismaService.userFavoriteElement, 'create')
      .mockImplementation().mock;
    // when
    await service.updateFavoriteElementOfUser(userId, elementId, true);
    // then
    expect(createMock.calls).toHaveLength(1);
    expect(existingElementMock.calls).toHaveLength(1);
  });

  it('should favorise an element', async () => {
    // given
    const existingElement = {
      elementId: 'element',
      userId: 'test-user',
    } as UserFavoriteElement;
    const userId = 'test-user';
    const elementId = 'test-element';
    const existingElementMock = jest
      .spyOn(prismaService.userFavoriteElement, 'findUnique')
      .mockResolvedValue(existingElement).mock;
    const createMock = jest.spyOn(
      prismaService.userFavoriteElement,
      'create',
    ).mock;
    const _findUniqueElementMock = jest
      .spyOn(prismaService.element, 'findUnique')
      .mockResolvedValueOnce({} as Element);
    // when
    await service.updateFavoriteElementOfUser(userId, elementId, true);
    // then
    expect(createMock.calls).toHaveLength(0);
    expect(existingElementMock.calls).toHaveLength(1);
  });
});
