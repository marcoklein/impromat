import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { Test, TestingModule } from '@nestjs/testing';
import { print, type ExecutionResult } from 'graphql';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/graphql/services/prisma.service';
import { ImprobibService } from 'src/improbib/improbib.service';
import request from 'supertest';
import { injectTestUserSessionMiddleware } from 'test/test-utils/inject-test-user-session-middleware';
import { prepareTestDatabase } from './prepare-test-database';
import { TestDatabase } from './test-database';

export interface ApiTestSession {
  impersonateUser: (userId: string) => void;
  impersonateActiveUser: () => void;
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
      .send({ query: print(operation), variables: variables ?? undefined });
    return response.body;
  }

  function impersonateActiveUser() {
    impersonateUser(testDatabase.userIdOfDbSession);
  }

  impersonateActiveUser();

  return {
    impersonateUser,
    impersonateActiveUser,
    testDb: testDatabase,
    userId: testDatabase.userIdOfDbSession,
    graphqlRequest: sendGraphqlQuery,
  };
}
