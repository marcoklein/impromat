import { PrismaClient } from '@prisma/client';

export const EXISTING_USER_ID = 'test-user-id';
export const EXISTING_USER_NAME = 'test-user-name';
export const NON_EXISTING_USER_ID = 'non-existing-test-user-id';

export async function prepareTestDatabase(prismaClient: PrismaClient) {
  await prismaClient.workshop.deleteMany({});
  await prismaClient.user.deleteMany({});
  await prismaClient.element.deleteMany({});
  await prismaClient.elementTag.deleteMany({});
  await prismaClient.workshopSection.deleteMany({});
  await prismaClient.userFavoriteElement.deleteMany({});

  await prismaClient.user.upsert({
    create: {
      id: EXISTING_USER_ID,
      name: EXISTING_USER_NAME,
    },
    update: {},
    where: {
      id: EXISTING_USER_ID,
    },
  });
  console.log('Test database prepared');
}
