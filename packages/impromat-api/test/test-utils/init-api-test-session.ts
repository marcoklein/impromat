import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { Test, TestingModule } from '@nestjs/testing';
import { print, type ExecutionResult } from 'graphql';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/graphql/services/prisma.service';
import request from 'supertest';
import { injectTestUserSessionMiddleware } from 'test/test-utils/inject-test-user-session-middleware';
import { prepareTestDatabase } from './prepare-test-database';
import { TestDatabase } from './test-database';

export interface ApiTestSession {
  impersonateUser: (userId: string | undefined) => void;
  impersonateActiveUser: () => void;
  impersonateOtherActiveUser: () => void;
  /**
   * Anonymous user without Impromat account accessing the API from the world wide web.
   */
  impersonatePublicUser: () => void;
  testDb: TestDatabase;
  /**
   * Randomly generated user id for this test session.
   * Use `impersonateActiveUser()` to login as this user.
   */
  userId: string;
  graphqlRequest<TResult, TVariables>(
    operation: TypedDocumentNode<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ): Promise<ExecutionResult<TResult>>;
  destroy: () => Promise<void>;
}

export async function initApiTestSession(): Promise<ApiTestSession> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  const impersonateUser = injectTestUserSessionMiddleware(app);
  const prismaService = moduleFixture.get<PrismaService>(PrismaService);
  const testDatabase = await prepareTestDatabase(prismaService);

  await app.init();

  async function sendGraphqlQuery<TResult, TVariables>(
    operation: TypedDocumentNode<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ): Promise<ExecutionResult<TResult>> {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({ query: print(operation), variables: variables ?? undefined });
    return response.body;
  }

  function impersonateActiveUser() {
    impersonateUser(testDatabase.userIdOfDbSession);
  }

  function impersonateOtherActiveUser() {
    impersonateUser(testDatabase.userIdBOfDbSession);
  }

  function impersonateAnonymousUser() {
    impersonateUser(undefined);
  }

  impersonateActiveUser();

  return {
    impersonateUser,
    impersonateOtherActiveUser,
    impersonateActiveUser,
    impersonatePublicUser: impersonateAnonymousUser,
    testDb: testDatabase,
    userId: testDatabase.userIdOfDbSession,
    graphqlRequest: sendGraphqlQuery,
    destroy: async () => {
      // TODO destroy api session in individual tests
      await app.close();
    },
  };
}
