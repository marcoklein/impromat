import { graphql } from 'test/graphql-client/gql';
import { NON_EXISTING_USER_ID } from 'test/graphql/prepare-test-database';
import { ApiTestSession, initApiTestSession } from './describe-component-test';

describe('me', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
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
          id
        }
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
