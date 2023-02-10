import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/graphql/services/prisma.service';
import * as request from 'supertest';
import {
  EXISTING_USER_ID,
  NON_EXISTING_USER_ID,
  prepareTestDatabase,
} from 'test/graphql/prepare-test-database';
import { AppModule } from '../../src/app.module';
import { injectTestUserSessionMiddleware } from '../common/inject-test-user-session-middleware';

describe('User Workshops', () => {
  let app: INestApplication;
  let impersonateUser: (userId: string | undefined) => void;

  const meQuery = /* GraphQL */ `
    {
      me {
        id
        workshops {
          id
        }
        elements {
          id
        }
        favoriteElements {
          id
        }
      }
    }
  `;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    impersonateUser = injectTestUserSessionMiddleware(app);
    const prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await prepareTestDatabase(prismaService);

    await app.init();
  });

  describe('happy', () => {
    it('should return active user for valid session with all relations', async () => {
      // given
      impersonateUser(EXISTING_USER_ID);
      const query = meQuery;
      // when
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);
      // then
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.me.id).toBe(EXISTING_USER_ID);
      expect(response.body.data.me.workshops).toEqual([]);
      expect(response.body.data.me.elements).toEqual([]);
      expect(response.body.data.me.favoriteElements).toEqual([]);
    });
  });

  describe('unhappy', () => {
    it('should throw if the user does not exist', async () => {
      // given
      impersonateUser(NON_EXISTING_USER_ID);
      const query = meQuery;
      // when
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);
      // then
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors[0].extensions.code).toBe(
        'INTERNAL_SERVER_ERROR',
      );
    });
  });
});
