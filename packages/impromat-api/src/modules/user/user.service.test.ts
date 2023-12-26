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
  ABILITY_ACTION_READ,
  AppAbility,
  defineAbilityForUser,
} from 'src/graphql/abilities';
import { ElementService } from 'src/modules/element/element.service';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { PrismaService } from '../database/prisma.service';
import { UserService } from './user.service';
import { UpdateUserInput } from 'src/dtos/inputs/update-user-input';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaServiceMockProvider],
    }).compile();

    service = moduleRef.get(UserService);
    prismaService = moduleRef.get(PrismaService);
  });

  // given
  let userRequestId: undefined | string;
  let ability: AppAbility;

  beforeEach(() => {
    userRequestId = 'test-user';
    ability = defineAbilityForUser(userRequestId);
  });

  describe('updateUser', () => {
    // given
    const updateUserInput: UpdateUserInput = {
      id: userRequestId!,
      languageCodes: ['de', 'en'],
      name: 'new-name',
    };
    let existingMock: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.user.findFirst>
    >;
    let updateMock: jest.SpyInstance<
      unknown,
      Parameters<typeof prismaService.user.update>
    >;

    beforeEach(() => {
      existingMock = prismaService.user.findFirst.mockResolvedValueOnce({
        id: userRequestId,
        name: 'test-name',
        languageCodes: [],
      } as Partial<User> as User);
      updateMock = prismaService.user.update.mockResolvedValueOnce({
        id: userRequestId,
        name: 'new-name',
        languageCodes: ['de', 'en'],
      } as Partial<User> as User);
    });

    it('should have expected existing sql', async () => {
      // when
      await service.updateUser(userRequestId, updateUserInput);
      // then
      expect(existingMock.mock.calls[0][0]).toEqual({
        where: {
          AND: [
            accessibleBy(ability, ABILITY_ACTION_READ).User,
            { id: userRequestId },
          ],
        },
      });
    });

    it('should have expected update sql', async () => {
      // when
      await service.updateUser(userRequestId, updateUserInput);
      // then
      expect(updateMock.mock.calls[0][0]).toEqual({
        where: { id: userRequestId! },
        data: {
          languageCodes: ['de', 'en'],
          name: 'new-name',
        },
      });
    });
  });
});
