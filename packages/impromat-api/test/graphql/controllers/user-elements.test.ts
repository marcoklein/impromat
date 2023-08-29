import { ElementVisibility } from 'test/graphql-client/graphql';
import { UUID4_REGEX } from 'test/test-utils/uuid4-regex';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { createElementMutation } from './element-queries';

describe('User Elements', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it('should run createElement mutation', async () => {
    // given
    // when
    const response = await api.graphqlRequest(createElementMutation, {
      input: {
        languageCode: 'en',
        visibility: ElementVisibility.Private,
        name: 'my-improv-game',
        markdown: 'test element',
      },
    });
    // then
    expect(response.errors).toBeUndefined();
    const result = response.data!.createElement;
    expect(result.name).toBe('my-improv-game');
    expect(result.markdown).toBe('test element');

    expect(result.id).toMatch(UUID4_REGEX);
    expect(result.version).toBe(0);
    expect(new Date(result.createdAt).getTime()).toBeGreaterThan(
      Date.now() - 1000,
    );
    expect(new Date(result.updatedAt).getTime()).toBeGreaterThan(
      Date.now() - 1000,
    );
    expect(result.deleted).toBe(false);
  });
});
