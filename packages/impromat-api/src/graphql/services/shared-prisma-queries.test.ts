import { elementLanguageFilterQuery } from './shared-prisma-queries';

describe('elementLanguageFilterQuery', () => {
  it('should return an empty object when languageCodes is undefined', () => {
    // given
    const userId = 'user123';
    const languageCodes = undefined;
    // when
    const result = elementLanguageFilterQuery(userId, languageCodes);
    // then
    expect(result).toEqual({});
  });

  it('should return an empty object when languageCodes is an empty array', () => {
    // given
    const userId = 'user123';
    const languageCodes: string[] = [];
    // when
    const result = elementLanguageFilterQuery(userId, languageCodes);
    // then
    expect(result).toEqual({});
  });

  it('should return a query with languageCode and ownerId/userFavoriteElement when userId is defined', () => {
    // given
    const userId = 'user123';
    const languageCodes = ['en', 'de'];
    // when
    const result = elementLanguageFilterQuery(userId, languageCodes);
    // then
    expect(result).toEqual({
      OR: [
        {
          languageCode: {
            in: languageCodes,
          },
        },
        {
          languageCode: null,
        },
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
    });
  });

  it('should return a query with languageCode when userId is undefined', () => {
    // given
    const userId = undefined;
    const languageCodes = ['en', 'de'];
    // when
    const result = elementLanguageFilterQuery(userId, languageCodes);
    // then
    expect(result).toEqual({
      OR: [
        {
          languageCode: {
            in: languageCodes,
          },
        },
        {
          languageCode: null,
        },
      ],
    });
  });
});
