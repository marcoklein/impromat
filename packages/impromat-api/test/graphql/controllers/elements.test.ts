import { graphql } from 'test/graphql-client';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { createElementMutation } from './element-queries';

describe('Elements', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it('should create an element', async () => {
    // given
    const query = graphql(`
    query QueryAllElements`);
    // when
    const response = await api.graphqlRequest(createElementMutation, {
      input: {
        name: 'my-improv-game',
        markdown: 'test element',
      },
    });
    // then
    expect(response.errors).toBeUndefined();
    const result = response.data!.createElement;
    expect(result.name).toBe('my-improv-game');
    expect(result.markdown).toBe('test element');
  });
});
