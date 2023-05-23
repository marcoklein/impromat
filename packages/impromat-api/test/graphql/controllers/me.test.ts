import { graphql } from 'test/graphql-client/gql';
import { NON_EXISTING_USER_ID } from 'test/test-utils/prepare-test-database';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';

describe('me', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  const meQuery = graphql(`
    query MeQuery {
      me {
        id
        workshops {
          id
        }
        elements {
          element {
            id
          }
        }
        favoriteElements {
          element {
            id
          }
        }
      }
    }
  `);

  const mutation = graphql(`
    mutation UpdateUserMutation($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        name
      }
    }
  `);

  describe('happy', () => {
    it('should return active user for valid session with all relations', async () => {
      // given
      api.impersonateActiveUser();
      const query = meQuery;
      // when
      const response = await api.graphqlRequest(query);
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data).toBeDefined();
      const me = response.data!.me;
      expect(me.id).toBe(api.userId);
      expect(me.workshops).toEqual([]);
      expect(me.elements).toEqual([]);
      expect(me.favoriteElements).toEqual([]);
    });

    it('should update user name', async () => {
      // given
      api.impersonateActiveUser();
      const newName = 'test';
      // when
      const response = await api.graphqlRequest(mutation, {
        input: { id: api.userId, name: newName },
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateUser.name).toBe('test');
    });

    it('should not allow user name with @', async () => {
      // given
      api.impersonateActiveUser();
      const newName = 'qwfp@';
      // when
      const response = await api.graphqlRequest(mutation, {
        input: { id: api.userId, name: newName },
      });
      // then
      expect(response.data).toBeNull();
      expect(response.errors).toBeDefined();
    });
  });

  describe('unhappy', () => {
    it('should throw if the user does not exist', async () => {
      // given
      api.impersonateUser(NON_EXISTING_USER_ID);
      const query = meQuery;
      // when
      const response = await api.graphqlRequest(query);
      // then
      expect(response.errors).toHaveLength(1);
      expect(response.errors![0].extensions.code).toBe('INTERNAL_SERVER_ERROR');
    });
  });
});
