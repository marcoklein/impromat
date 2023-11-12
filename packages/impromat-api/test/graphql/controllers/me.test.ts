import { randomUUID } from 'node:crypto';
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
          id
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
      expect(me?.id).toBe(api.userId);
      expect(me?.workshops).toEqual([]);
      expect(me?.elements).toEqual([]);
      expect(me?.favoriteElements).toEqual([]);
    });

    it('should update user name', async () => {
      // given
      api.impersonateActiveUser();
      const newName = `${randomUUID().slice(0, 12)}-test`;
      // when
      const response = await api.graphqlRequest(mutation, {
        input: { id: api.userId, name: newName },
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateUser.name).toBe(newName);
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
    it('should return null if user does not exist', async () => {
      // given
      api.impersonateUser(NON_EXISTING_USER_ID);
      const query = meQuery;
      // when
      const response = await api.graphqlRequest(query);
      // then
      expect(response.data?.me).toBeNull();
    });
  });
});
