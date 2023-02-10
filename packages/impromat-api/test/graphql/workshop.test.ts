import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/graphql/services/prisma.service';
import * as request from 'supertest';
import { UUID4_REGEX } from 'test/common/uuid4-regex';
import {
  EXISTING_USER_ID,
  prepareTestDatabase,
} from 'test/graphql/prepare-test-database';
import { AppModule } from '../../src/app.module';
import { injectTestUserSessionMiddleware } from '../common/inject-test-user-session-middleware';

describe('User Workshops', () => {
  let app: INestApplication;
  let impersonateUser: (userId: string) => void;

  const workshopsQuery = /* GraphQL */ `
    {
      userWorkshops {
        id
        name
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

  beforeEach(() => {
    impersonateUser(EXISTING_USER_ID);
  });

  describe('happy', () => {
    let newWorkshopId: string;

    it('should read an empty list', async () => {
      // given
      const query = workshopsQuery;
      // when
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);
      // then
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.userWorkshops).toEqual([]);
    });

    it('should add a new workshop', async () => {
      // given
      const testWorkshopName = 'test-workshop';
      const query = /* GraphQL */ `
        mutation {
          addWorkshop(workshop: { name: "${testWorkshopName}" }) {
            id
            version
            createdAt
            updatedAt
            deleted

            name
          }
        }
      `;
      // when
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);
      // then
      expect(response.body.errors).toBeUndefined();
      const newWorkshop = response.body.data.addWorkshop;
      expect(newWorkshop.id).toMatch(UUID4_REGEX);
      expect(newWorkshop.name).toBe(testWorkshopName);

      const { id, version, createdAt, updatedAt, deleted } = response.body.data;
      expect(id).toMatch(UUID4_REGEX);
      expect(version).toBe(0);
      expect(createdAt.getTime()).toBeGreaterThan(Date.now() - 1000);
      expect(updatedAt.getTime()).toBeGreaterThan(Date.now() - 1000);
      expect(deleted).toBe(false);

      newWorkshopId = newWorkshop.id;
    });

    it('should read the new workshop ', async () => {
      // given
      const query = workshopsQuery;
      // when
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query });
      // then
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.userWorkshops).toHaveLength(1);
      expect(response.body.data.userWorkshops[0].id).toBe(newWorkshopId);
    });
  });

  describe('unhappy', () => {
    it('should not add a new workshop without a name', async () => {
      // given
      const query = /* GraphQL */ `
        mutation {
          addWorkshop(workshop: { name: "" }) {
            id
            name
          }
        }
      `;
      // when
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);
      // then
      expect(response.body.errors).toHaveLength(1);
      const error = response.body.errors[0];
      expect(error.extensions.code).toBe('BAD_USER_INPUT');
      expect(error.extensions.response.message[0]).toContain(
        'name must be longer than or equal to 1 characters',
      );
    });
  });
});
