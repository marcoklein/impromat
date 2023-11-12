import { Prisma } from '@prisma/client';

/**
 * Returns a Prisma.ElementWhereInput object that can be used to filter elements based on user language codes and ownership.
 *
 * @param userId - The ID of the user.
 * @param languageCodes - An array of language codes.
 * @returns A Prisma.ElementWhereInput object.
 */
export const elementLanguageFilterQuery = (
  userId: string | undefined,
  languageCodes: string[] | undefined,
): Prisma.ElementWhereInput => {
  if (languageCodes === undefined || languageCodes.length === 0) {
    return {};
  }
  const languageCodeQuery: Prisma.ElementWhereInput[] = [
    {
      languageCode: {
        in: languageCodes,
      },
    },
    {
      languageCode: null,
    },
  ];
  const ignoreLanguageCodeForOwnedAndLikedElementsQuery: Prisma.ElementWhereInput[] =
    [
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
    ];
  if (userId) {
    return {
      OR: [
        ...languageCodeQuery,
        ...ignoreLanguageCodeForOwnedAndLikedElementsQuery,
      ],
    };
  }
  return {
    OR: [...languageCodeQuery],
  };
};

export const noSnapshotElementFilterQuery: Prisma.ElementWhereInput = {
  snapshotParentId: null,
};
