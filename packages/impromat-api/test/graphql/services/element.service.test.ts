import { accessibleBy } from '@casl/prisma';
import { Test } from '@nestjs/testing';
import {
  Element,
  ElementVisibility as PrismaElementVisibility,
  Element as PrismaElement,
} from '@prisma/client';
import { UpdateElementInput } from 'src/dtos/inputs/element-input';
import { ElementVisibility } from 'src/dtos/types/element-visibility.dto';
import {
  ABILITY_ACTION_READ,
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

  describe('updateElement', () => {
    it('should update an element', async () => {
      // given
      const userRequestId = 'test-user';
      const ability = defineAbilityForUser(userRequestId);
      const updateInput: UpdateElementInput = {
        id: 'test-element',
      };
      const existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValue({
          id: 'test-element',
          ownerId: 'test-user',
          visibility: 'PRIVATE',
          tags: [],
        } as Partial<PrismaElement> as PrismaElement);
      const createSnapshotElementMock = jest
        .spyOn(prismaService.element, 'create')
        .mockResolvedValueOnce('createSnapshotElementMock' as any);
      const updateElementMock = jest
        .spyOn(prismaService.element, 'update')
        .mockResolvedValueOnce('updateElementMock' as any);
      const updateTransaction = jest
        .spyOn(prismaService, '$transaction')
        .mockResolvedValue([
          null,
          {
            id: 'test-element',
            visibility: 'PRIVATE',
          } as Element,
        ]);
      // when
      const response = await service.updateElement(userRequestId, updateInput);
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

      expect(createSnapshotElementMock.mock.calls[0][0].data).toEqual({
        ownerId: 'test-user',
        visibility: 'PRIVATE',
        snapshotParentId: 'test-element',
        snapshotUserId: userRequestId,
        tags: { connect: [] },
      });

      expect(updateElementMock.mock.calls[0][0]).toEqual({
        where: {
          id: 'test-element',
        },
        data: updateInput,
      });
      expect(updateTransaction.mock.calls).toHaveLength(1);
      expect(response).toEqual({
        id: 'test-element',
        visibility: 'PRIVATE',
      });
    });

    it('should throw an error if the element is not existing', async () => {
      // given
      const userRequestId = 'test-user';
      const updateInput: UpdateElementInput = {
        id: 'test-element',
      };
      const _existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValueOnce(null);
      // when
      try {
        await service.updateElement(userRequestId, updateInput);
        fail('Error expected.');
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(Error);
        expect((e as Error).message).toContain(
          'Not existing or insufficient read rights.',
        );
      }
    });

    it('should throw an error if the element is not writable', async () => {
      // given
      const userRequestId = 'test-user';
      const updateInput: UpdateElementInput = {
        id: 'test-element',
      };
      const _existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValueOnce({ ownerId: 'other-user' } as PrismaElement);
      // when
      try {
        await service.updateElement(userRequestId, updateInput);
        fail('Error expected.');
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(Error);
        expect((e as Error).message).toContain('Write not permitted.');
      }
    });

    it('should throw an error if update contains a visiblity change from PUBLIC to PRIVATE', async () => {
      // given
      const userRequestId = 'test-user';
      const updateInput: UpdateElementInput = {
        id: 'test-element',
        visibility: ElementVisibility.PRIVATE,
      };
      const _existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValueOnce({
          ownerId: 'test-user',
          visibility: 'PUBLIC',
        } as PrismaElement);
      // when
      try {
        await service.updateElement(userRequestId, updateInput);
        fail('Error expected.');
      } catch (e) {
        // then
        expect(e).toBeInstanceOf(Error);
        expect((e as Error).message).toContain(
          'Cannot change visibility to private.',
        );
      }
    });
  });
});
