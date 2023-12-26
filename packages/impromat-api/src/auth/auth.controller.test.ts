import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/database/prisma.service';
import {
  PrismaServiceMock,
  PrismaServiceMockProvider,
} from 'test/prisma-service-mock';
import { AuthController } from './auth.controller';
import { GoogleOAuth2ClientService } from './google-oauth2-client-provider';

describe('AuthController', () => {
  let controller: AuthController;
  let prismaService: PrismaServiceMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthController,
        { provide: GoogleOAuth2ClientService, useValue: {} },
        PrismaServiceMockProvider,
      ],
    }).compile();

    controller = moduleRef.get(AuthController);
    prismaService = moduleRef.get(PrismaService);
  });

  describe('signInWithAccessToken', () => {
    it('should trigger expected SQL', async () => {
      // given
      const body = { name: 'user-name', accessToken: 'secret-access-token' };
      const findFirstMock = prismaService.user.findFirstOrThrow;
      findFirstMock.mockResolvedValueOnce({ id: 'user-name' } as User);
      const requestMock = {
        session: {
          save: () => {
            //nothing
          },
          id: '123',
          data: null,
        },
      } as any;
      const responseMock = {} as any;
      // when
      await controller.signInWithAccessToken(body, requestMock, responseMock);
      // then
      expect(findFirstMock.mock.calls[0][0]).toEqual({
        where: { name: 'user-name', accessToken: 'secret-access-token' },
      });
    });
  });
});
