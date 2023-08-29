import { accessibleBy } from '@casl/prisma';
import { Test } from '@nestjs/testing';
import {
  Element,
  Element as PrismaElement,
  ElementVisibility as PrismaElementVisibility,
  User,
} from '@prisma/client';
import {
  CreateElementInput,
  UpdateElementInput,
} from 'src/dtos/inputs/element-input';
import { ElementVisibility } from 'src/dtos/types/element-visibility.dto';
import {
  ABILITY_ACTION_LIST,
  ABILITY_ACTION_READ,
  AppAbility,
  defineAbilityForUser,
} from 'src/graphql/abilities';
import { ElementService } from 'src/graphql/services/element.service';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { PrismaService } from './prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UserService } from './user.service';
import { ElementAIService } from './element-ai.service';

describe('ElementService', () => {
  let service: ElementService;
  let prismaService: PrismaServiceMock;
  let userService: DeepMockProxy<UserService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ElementService,
        { provide: ElementAIService, useValue: {} },
        PrismaServiceMockProvider,
        { provide: UserService, useValue: mockDeep(UserService) },
      ],
    }).compile();

    service = moduleRef.get(ElementService);
    prismaService = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);
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

  describe('findElements', () => {
    // given
    const options = {
      filter: { isOwnerMe: true, isPublic: true },
      orderBy: { notImplemented: true },
      skip: 1,
      take: 3,
    };

    let userMock: jest.SpyInstance<
      unknown,
      Parameters<typeof userService.findUserById>
    >;
    let findManyMock: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.element.findMany>
    >;
    beforeEach(() => {
      userMock = userService.findUserById.mockResolvedValueOnce({
        id: userRequestId,
        languageCodes: ['en', 'de'],
      } as User);
      findManyMock = prismaService.element.findMany.mockResolvedValue([
        {
          id: 'test-element',
          ownerId: 'test-user',
          visibility: 'PRIVATE',
          languageCode: 'en',
        },
      ] as PrismaElement[]);
    });

    it('should trigger the expected user mock', async () => {
      // when
      await service.findElements(userRequestId, options);
      // then
      expect(userMock.mock.calls[0][0]).toEqual(userRequestId);
    });

    it('should trigger the expected find many SQL', async () => {
      // when
      await service.findElements(userRequestId, options);
      // then
      expect(findManyMock.mock.calls[0][0]).toEqual({
        where: {
          AND: [
            accessibleBy(ability, ABILITY_ACTION_LIST).Element,
            {
              snapshotParentId: null,
            },
            {
              OR: [
                { languageCode: { in: ['en', 'de'] } },
                { languageCode: null },
                { ownerId: userRequestId },
                {
                  userFavoriteElement: {
                    some: {
                      userId: userRequestId,
                    },
                  },
                },
              ],
            },
            {
              OR: [{ ownerId: userRequestId }, { visibility: 'PUBLIC' }],
            },
          ],
        },
        orderBy: [{ updatedAt: 'desc' }, { id: 'asc' }],
        skip: 1,
        take: 3,
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

    describe('with tags input', () => {
      it('should call the expected SQL for connecting tags', async () => {
        // given
        const createElementInputWithTags = {
          name: 'test-element-name',
          tags: {
            connect: [
              {
                name: 'first-tag',
              },
              {
                id: 'second-tag-id',
              },
              {
                id: 'last-tag-id',
                name: 'last-tag',
              },
            ],
          },
        } as CreateElementInput;
        // when
        await service.createElement(userRequestId, createElementInputWithTags);
        // then
        expect(createMock.mock.calls[0][0].data.tags).toEqual({
          connect: [
            {
              name: 'first-tag',
            },
            {
              id: 'second-tag-id',
            },
            {
              id: 'last-tag-id',
              name: 'last-tag',
            },
          ],
        });
      });

      it('should call the expected SQL for setting tags', async () => {
        // given
        const createElementInputWithTags = {
          name: 'test-element-name',
          tags: {
            set: [
              {
                name: 'first-tag',
              },
              {
                id: 'second-tag-id',
              },
              {
                id: 'last-tag-id',
                name: 'last-tag',
              },
            ],
          },
        } as CreateElementInput;
        // when
        await service.createElement(userRequestId, createElementInputWithTags);
        // then
        expect(createMock.mock.calls[0][0].data.tags).toEqual({
          connectOrCreate: [
            {
              create: { name: 'first-tag' },
              where: { name: 'first-tag' },
            },
            {
              create: { name: 'last-tag' },
              where: { id: 'last-tag-id', name: 'last-tag' },
            },
          ],
          connect: [
            {
              id: 'second-tag-id',
            },
          ],
        });
      });

      it('should throw if set is called without any arguments', async () => {
        // given
        const createElementInputWithTags = {
          name: 'test-element-name',
          tags: {
            set: [
              {
                name: undefined,
                id: undefined,
              },
            ],
          },
        } as unknown as CreateElementInput;
        // when, then
        await expect(
          service.createElement(userRequestId, createElementInputWithTags),
        ).rejects.toThrowError('Name and id undefined');
      });

      it('should not allow "connect" and "set" call for element tags', async () => {
        // given
        const createElementInputWithTags = {
          name: 'test-element-name',
          tags: {
            set: [
              {
                name: 'first-tag',
              },
            ],
            connect: [
              {
                id: 'test',
              },
            ],
          },
        } as CreateElementInput;
        // when, then
        await expect(
          service.createElement(userRequestId, createElementInputWithTags),
        ).rejects.toThrowError(
          'Specify either "connect" or "set" for tags input.',
        );
      });
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
      updateInput = {
        id: 'test-element',
        improbibIdentifier: 'improbib-identifier',
      };
      await service.updateElement(userRequestId, updateInput);
      // then
      expect(createSnapshotElementMock.mock.calls[0][0].data).toEqual({
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        metadata: {
          connect: undefined,
        },
        ownerId: 'test-user',
        visibility: 'PRIVATE',
        snapshotParentId: 'test-element',
        improbibIdentifier: undefined,
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
        data: {
          ...updateInput,
          metadata: {
            connect: undefined,
          },
          tags: {
            connectOrCreate: [],
          },
        },
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

    describe('with tags input', () => {
      it('should throw an error if calling set elements input', async () => {
        // given
        const updateElementInput = {
          name: 'test-element-name',
          tags: {
            set: [
              {
                name: 'first-tag',
              },
              {
                id: 'second-tag-id',
              },
              {
                id: 'last-tag-id',
                name: 'last-tag',
              },
            ],
          },
        } as UpdateElementInput;

        // when, then
        await expect(() =>
          service.updateElement(userRequestId, updateElementInput),
        ).rejects.toThrow('Not implemented yet');
      });
    });
  });
});
