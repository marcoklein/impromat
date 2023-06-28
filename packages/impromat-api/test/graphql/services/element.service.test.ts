import { accessibleBy } from '@casl/prisma';
import { Test } from '@nestjs/testing';
import {
  Element,
  Element as PrismaElement,
  ElementVisibility as PrismaElementVisibility,
} from '@prisma/client';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { ElementVisibility } from 'src/dtos/types/element-visibility.dto';
import {
  ABILITY_ACTION_READ,
  AppAbility,
  defineAbilityForUser,
} from 'src/graphql/abilities';
import { ElementService } from 'src/graphql/services/element.service';
import { PrismaService } from 'src/graphql/services/prisma.service';

describe('ElementService', () => {
  let service: ElementService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ElementService, PrismaService],
    }).compile();

    service = moduleRef.get(ElementService);
    prismaService = moduleRef.get(PrismaService);
  });

  // given
  let userRequestId: undefined | string;
  let ability: AppAbility;

  beforeEach(() => {
    userRequestId = 'test-user';
    ability = defineAbilityForUser(userRequestId);
  });

  describe('findElementById', () => {
    // given
    const elementId = 'test-element';

    it('should trigger the correct SQL', async () => {
      // given
      const findFirstSpy = jest
        .spyOn(prismaService.element, 'findFirstOrThrow')
        .mockResolvedValueOnce({
          id: 'test-element',
          ownerId: 'test-user',
          visibility: 'PRIVATE',
          tags: [],
        } as Partial<PrismaElement> as PrismaElement);
      // when
      await service.findElementById(userRequestId, elementId);
      // then
      expect(findFirstSpy.mock.calls[0][0]).toEqual({
        where: {
          AND: [
            accessibleBy(ability, ABILITY_ACTION_READ).Element,
            { id: elementId },
          ],
        },
      });
    });
  });

  describe('createElement', () => {
    // given
    const createElementInput = {
      name: 'test-element-name',
    } as CreateElementInput;
    let createMock: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.element.create>
    >;

    beforeEach(() => {
      // given default mocks
      createMock = jest
        .spyOn(prismaService.element, 'create')
        .mockResolvedValueOnce({
          id: 'test-element',
          ownerId: 'test-user',
          visibility: 'PRIVATE',
          tags: [],
        } as Partial<PrismaElement> as PrismaElement);
    });

    it('should trigger expected create call', async () => {
      // when
      await service.createElement(userRequestId, createElementInput);
      // then
      expect(createMock.mock.calls[0][0]).toEqual({
        data: {
          ...createElementInput,
          sourceName: 'impromat',
          ownerId: userRequestId,
        },
      });
    });

    it('should throw an error if user is unauthorized', async () => {
      // given
      userRequestId = undefined;
      // when, then
      await expect(
        service.createElement(userRequestId, createElementInput),
      ).rejects.toThrow('Unauthorized');
    });
  });

  describe('updateElement', () => {
    // given
    let updateInput: UpdateElementInput = {
      id: 'test-element',
    };
    let existingMock: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.element.findFirst>
    >;
    let createSnapshotElementMock: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.element.create>
    >;
    let updateElementMock: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.element.update>
    >;
    let updateTransaction: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.$transaction>
    >;
    beforeEach(() => {
      // given default mocks
      existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValue({
          id: 'test-element',
          ownerId: 'test-user',
          visibility: 'PRIVATE',
          tags: [],
        } as Partial<PrismaElement> as PrismaElement);
      createSnapshotElementMock = jest
        .spyOn(prismaService.element, 'create')
        .mockResolvedValueOnce('createSnapshotElementMock' as any);
      updateElementMock = jest
        .spyOn(prismaService.element, 'update')
        .mockResolvedValueOnce('updateElementMock' as any);
      updateTransaction = jest
        .spyOn(prismaService, '$transaction')
        .mockResolvedValue([
          null,
          {
            id: 'test-element',
            visibility: 'PRIVATE',
          } as Element,
        ]);
    });

    it('should have the expected SQL call', async () => {
      // when
      await service.updateElement(userRequestId, updateInput);
      // then
      expect(existingMock.mock.calls[0][0]?.where).toEqual({
        AND: [
          accessibleBy(ability, ABILITY_ACTION_READ).Element,
          { id: 'test-element' },
          {
            OR: [
              { ownerId: userRequestId },
              { visibility: PrismaElementVisibility.PUBLIC },
            ],
          },
        ],
      });
    });

    it('should create a snapshot element', async () => {
      // when
      await service.updateElement(userRequestId, updateInput);
      // then
      expect(createSnapshotElementMock.mock.calls[0][0].data).toEqual({
        ownerId: 'test-user',
        visibility: 'PRIVATE',
        snapshotParentId: 'test-element',
        snapshotUserId: userRequestId,
        tags: { connect: [] },
      });
    });

    it('should update the element', async () => {
      // when
      await service.updateElement(userRequestId, updateInput);
      // then
      expect(updateElementMock.mock.calls[0][0]).toEqual({
        where: {
          id: 'test-element',
        },
        data: updateInput,
      });
      expect(updateTransaction.mock.calls).toHaveLength(1);
    });

    it('should have the expected response', async () => {
      // when
      const response = await service.updateElement(userRequestId, updateInput);
      // then
      expect(response).toEqual({
        id: 'test-element',
        visibility: 'PRIVATE',
      });
    });

    it('should throw an error if user is unauthorized', async () => {
      // given
      userRequestId = undefined;
      // when, then
      await expect(
        service.updateElement(userRequestId, updateInput),
      ).rejects.toThrow('Unauthorized');
    });

    it('should throw an error if the element is not existing', async () => {
      // given
      existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValueOnce(null);
      // when, then
      await expect(() =>
        service.updateElement(userRequestId, updateInput),
      ).rejects.toThrow('Not existing or insufficient read rights');
    });

    it('should throw an error if the element is not writable', async () => {
      // given
      existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValueOnce({ ownerId: 'other-user' } as PrismaElement);
      // when, then
      await expect(() =>
        service.updateElement(userRequestId, updateInput),
      ).rejects.toThrow('Write not permitted.');
    });

    it('should throw an error if update contains a visiblity change from PUBLIC to PRIVATE', async () => {
      // given
      updateInput = {
        id: 'test-element',
        visibility: ElementVisibility.PRIVATE,
      };
      existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValueOnce({
          ownerId: 'test-user',
          visibility: 'PUBLIC',
        } as PrismaElement);
      // when, then
      await expect(() =>
        service.updateElement(userRequestId, updateInput),
      ).rejects.toThrow('Cannot change visibility to private.');
    });
  });
});
