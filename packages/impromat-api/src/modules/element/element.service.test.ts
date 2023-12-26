import { accessibleBy } from '@casl/prisma';
import { Test } from '@nestjs/testing';
import {
  Element,
  Element as PrismaElement,
  ElementVisibility as PrismaElementVisibility,
  User,
} from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { randomUUID as randomUUIDOriginal } from 'node:crypto';
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
import { ElementSummaryService } from 'src/modules/element-ai/element-summary.service';
import { ElementService } from 'src/modules/element/element.service';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { UUID4_REGEX } from 'test/test-utils/uuid4-regex';
import { UserService } from '../user/user.service';
import { PrismaService } from '../database/prisma.service';

jest.mock('node:crypto');
const randomUUID = randomUUIDOriginal as jest.Mock;

describe('ElementService', () => {
  let service: ElementService;
  let prismaService: PrismaServiceMock;
  let userService: DeepMockProxy<UserService>;
  const randomUUID4 = '2a4f6f7b-69c8-4e50-ab1d-6df4aad892f4';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ElementService,
        { provide: ElementSummaryService, useValue: {} },
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
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
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
    let transactionMock: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.$transaction>
    >;

    beforeEach(() => {
      // given default mocks
      randomUUID.mockReturnValue(randomUUID4);
      createMock = prismaService.element.create.mockResolvedValueOnce({
        id: randomUUID4,
        ownerId: 'test-user',
        visibility: 'PRIVATE',
      } as Partial<PrismaElement> as PrismaElement);

      transactionMock = prismaService.$transaction.mockResolvedValue([
        {
          id: randomUUID4,
          visibility: 'PRIVATE',
        } as Element,
      ]);
    });

    it('should trigger expected create call', async () => {
      // when
      await service.createElement(userRequestId, createElementInput);
      // then
      const createCallData = createMock.mock.calls[0][0].data;
      expect(createCallData).toEqual({
        ...createElementInput,
        id: '2a4f6f7b-69c8-4e50-ab1d-6df4aad892f4',
        sourceName: 'impromat',
        ownerId: userRequestId,
        tags: undefined,
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
                name: 'second-tag',
              },
            ],
          },
        } as CreateElementInput;
        // when
        const result = await service.createElement(
          userRequestId,
          createElementInputWithTags,
        );
        // then
        expect(
          prismaService.elementToElementTag.create.mock.calls,
        ).toHaveLength(2);
        expect(
          prismaService.elementToElementTag.create.mock.calls[0][0].data,
        ).toEqual({
          element: {
            connect: {
              id: result.id,
            },
          },
          tag: {
            connectOrCreate: {
              create: {
                name: 'first-tag',
              },
              where: {
                name: 'first-tag',
              },
            },
          },
        });
        expect(
          prismaService.elementToElementTag.create.mock.calls[1][0].data,
        ).toEqual({
          element: {
            connect: {
              id: result.id,
            },
          },
          tag: {
            connectOrCreate: {
              create: {
                name: 'second-tag',
              },
              where: {
                name: 'second-tag',
              },
            },
          },
        });
      });
    });
  });

  describe('updateElement', () => {
    // given
    let updateInput: UpdateElementInput;
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
      updateInput = {
        id: 'test-element',
        name: 'new-name',
      };
      existingMock = jest
        .spyOn(prismaService.element, 'findFirst')
        .mockResolvedValue({
          id: 'test-element',
          ownerId: 'test-user',
          visibility: 'PRIVATE',
          tags: [
            { tag: { id: 'tag1-id', name: 'tag1' } },
            { tag: { id: 'tag2-id', name: 'tag2' } },
          ],
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
      // given beforeEach
      updateInput = {
        id: 'test-element',
        improbibIdentifier: 'improbib-identifier',
      };
      // when
      await service.updateElement(userRequestId, updateInput);
      // then
      expect(createSnapshotElementMock.mock.calls[0][0].data).toEqual({
        id: expect.stringMatching(UUID4_REGEX), //  randomUUID4, 2a4f6f7b-69c8-4e50-ab1d-6df4aad892f4
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
        tags: undefined,
      });
    });

    it('should not create a snapshot element if there is no change to tags', async () => {
      // given beforeEach
      updateInput = {
        id: 'test-element',
        tags: { set: [{ name: 'tag1' }, { name: 'tag2' }] },
      };
      // when
      await service.updateElement(userRequestId, updateInput);
      // then
      expect(createSnapshotElementMock.mock.calls).toHaveLength(0);
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
          version: {
            increment: 1,
          },
          metadata: {
            connect: undefined,
          },
          tags: undefined,
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
  });
});
