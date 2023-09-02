import { Prisma } from '@prisma/client';

export const elementLanguageFilterQuery = (
  userId: string,
  userLanguageCodes: string[] | undefined,
): Prisma.ElementWhereInput => {
  if (userLanguageCodes === undefined || userLanguageCodes.length === 0) {
    return {};
  }
  return {
    OR: [
      {
        languageCode: {
          in: userLanguageCodes,
        },
      },
      {
        languageCode: null,
      },
      // ignore language for owned requests and liked elements
      {
        ownerId: userId,
      },
      {
        userFavoriteElement: {
          some: {
            userId: userId,
          },
        },
      },
    ],
  };
};

export const noSnapshotElementFilterQuery: Prisma.ElementWhereInput = {
  snapshotParentId: null,
};
