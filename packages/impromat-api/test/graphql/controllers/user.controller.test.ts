import { graphql } from 'test/graphql-client';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { TestDataProvider } from './test-data-provider';

const userElementsQuery = graphql(`
  query UserElements($userId: ID!, $input: UserElementsFilterInput!) {
    user(id: $userId) {
      elements(input: $input) {
        element {
          id
          name
          visibility
          isFavorite
        }
        score
      }
    }
  }
`);

describe('User Elements', () => {
  let api: ApiTestSession;
  let testData: TestDataProvider;

  beforeEach(async () => {
    api = await initApiTestSession();
    testData = new TestDataProvider(api);
  });

  afterEach(async () => {
    await api.destroy();
  });

  it('should return all elements per default with page size of 20 per default', async () => {
    // given
    api.impersonateActiveUser();
    const defaultTake = 20;
    // when
    const result = await api.graphqlRequest(userElementsQuery, {
      userId: api.userId,
      input: {},
    });
    // then
    expect(result.errors).toBeUndefined();
    expect(result.data?.user.elements).toHaveLength(defaultTake);
  });

  it('should return all liked elements only', async () => {
    // given
    api.impersonateActiveUser();
    const customElementId = await testData.createCustomElement();
    const freezeTagId = await testData.getIdOfPublicElementFreezeTag();
    await testData.likeElementWithId(customElementId);
    await testData.likeElementWithId(freezeTagId);
    // when
    const result = await api.graphqlRequest(userElementsQuery, {
      userId: api.userId,
      input: { liked: true, public: false, owned: false },
    });
    // then
    expect(result.errors).toBeUndefined();
    expect(result.data?.user.elements).toHaveLength(2);
    expect(result.data?.user.elements.map(({ element }) => element.id)).toEqual(
      [customElementId, freezeTagId],
    );
  });

  it('should return owned element only', async () => {
    // given
    api.impersonateActiveUser();
    const customElementId = await testData.createCustomElement();
    const freezeTagId = await testData.getIdOfPublicElementFreezeTag();
    await testData.likeElementWithId(customElementId);
    await testData.likeElementWithId(freezeTagId);
    // when
    const result = await api.graphqlRequest(userElementsQuery, {
      userId: api.userId,
      input: {
        liked: false,
        public: false,
        owned: true,
        searchText: undefined,
      },
    });
    // then
    expect(result.errors).toBeUndefined();
    expect(result.data?.user.elements).toHaveLength(1);
    expect(result.data?.user.elements[0].element.id).toBe(customElementId);
  });
});
