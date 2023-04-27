import { graphql } from 'test/graphql-client';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { searchElementsQuery } from './element-queries';

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
    // then
    expect(result.data?.searchElements[0].element.name).toBe('Freeze');
    expect(
      result.data?.searchElements[0].element.markdown?.length,
    ).toBeGreaterThan(2000);
    expect(
      result.data?.searchElements[0].element.markdownShort?.length,
    ).toEqual(300);
  });
});
