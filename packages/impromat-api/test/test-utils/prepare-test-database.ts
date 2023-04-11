import { PrismaClient } from '@prisma/client';
import { TestDatabase } from './test-database';

export const EXISTING_USER_NAME = 'test-user-name';
export const NON_EXISTING_USER_ID = 'non-existing-test-user-id';

export async function prepareTestDatabase(
  prismaClient: PrismaClient,
): Promise<TestDatabase> {
  const { id } = await prismaClient.user.create({ data: {} });
  const { id: idUserB } = await prismaClient.user.create({ data: {} });

  console.log('Test database prepared');

  return {
    userIdOfDbSession: id,
    userIdBOfDbSession: idUserB,
  };
}
