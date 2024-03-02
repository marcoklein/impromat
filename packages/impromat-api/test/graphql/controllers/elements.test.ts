import { ElementVisibility } from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { elementByIdQuery, searchElementsQuery } from './element-queries';

describe('Elements', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it('should find an element by text', async () => {
    // given
    api.impersonateActiveUser();
    // when
    const result = await api.graphqlRequest(searchElementsQuery, {
      input: { text: 'freeze' },
    });
    const searchElements = result.data!.searchElements;
    // then
    expect(searchElements[0].element.name).toBe('Freeze');
    expect(searchElements[0].element.markdown?.length).toBeGreaterThan(2000);
    expect(searchElements[0].element.markdownShort?.length).toEqual(300);
  });

  it('should allow public user to query public element', async () => {
    // given
    api.impersonateActiveUser();
    const freezeSearchResult = await api.graphqlRequest(searchElementsQuery, {
      input: { text: 'freeze' },
    });
    const publicElementId =
      freezeSearchResult.data?.searchElements[0].element.id;
    expect(freezeSearchResult.data?.searchElements[0].element.visibility).toBe(
      ElementVisibility.Public,
    );
    api.impersonatePublicUser();
    // when
    const result = await api.graphqlRequest(elementByIdQuery, {
      id: publicElementId,
    });
    // then
    expect(result.errors).toBeUndefined();
    expect(result.data?.element?.id).toBe(publicElementId);
  });
});
