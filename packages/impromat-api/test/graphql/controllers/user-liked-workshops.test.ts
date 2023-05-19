import assert from 'assert';
import { graphql } from 'test/graphql-client';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { provideComplexTestWorkshopFixture } from './workshop-fixture';
import { createWorkshopMutation } from './workshop-queries';

const updateUserFavoriteElementMutation = graphql(`
  mutation UpdateUserFavoriteWorkshop($input: UpdateUserLikedWorkshopInput!) {
    updateUserLikedWorkshop(input: $input) {
      id
    }
  }
`);

const meFavoriteElementsQuery = graphql(`
  query MeFavoriteWorkshops {
    me {
      likedWorkshops {
        workshop {
          id
        }
      }
    }
  }
`);

describe('User Liked Workshops', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('Like Flow', () => {
    let createdWorkshopId: string;

    it('should not return isLiked for workshop', async () => {
      // given
      const createElementResponse = await api.graphqlRequest(
        createWorkshopMutation,
        {
          input: {
            name: 'my-improv-workshop',
          },
        },
      );
      // when
      const response = await api.graphqlRequest(
        graphql(`
          query WorkshopIsFavorite($id: ID!) {
            workshop(id: $id) {
              isLiked
            }
          }
        `),
        {
          id: createElementResponse.data!.createWorkshop.id,
        },
      );
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshop?.isLiked).toBe(false);
    });

    it('should like workshop', async () => {
      // given
      const createElementResponse = await api.graphqlRequest(
        createWorkshopMutation,
        {
          input: {
            name: 'my-improv-game',
          },
        },
      );
      assert(createElementResponse.data?.createWorkshop.id);
      // when
      const response = await api.graphqlRequest(
        updateUserFavoriteElementMutation,
        {
          input: {
            workshopId: createElementResponse.data.createWorkshop.id,
            isLiked: true,
          },
        },
      );
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateUserLikedWorkshop?.id).toBe(
        createElementResponse.data.createWorkshop.id,
      );
      createdWorkshopId = createElementResponse.data.createWorkshop.id;
    });

    it('should get favorite element from me query', async () => {
      // given
      assert(createdWorkshopId, 'requires previous test');
      // when
      const response = await api.graphqlRequest(meFavoriteElementsQuery);
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.me.likedWorkshops).toHaveLength(1);
      expect(response.data?.me.likedWorkshops[0].workshop.id).toBe(
        createdWorkshopId,
      );
    });

    it('should return isLiked for workshop', async () => {
      // given
      assert(createdWorkshopId, 'requires previous test');
      // when
      const response = await api.graphqlRequest(
        graphql(`
          query WorkshopIsLiked($id: ID!) {
            workshop(id: $id) {
              isLiked
            }
          }
        `),
        {
          id: createdWorkshopId,
        },
      );
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshop?.isLiked).toBe(true);
    });

    it('should remove workshop from liked ones', async () => {
      // given
      assert(createdWorkshopId, 'requires previous test');
      // when
      const response = await api.graphqlRequest(
        updateUserFavoriteElementMutation,
        {
          input: {
            workshopId: createdWorkshopId,
            isLiked: false,
          },
        },
      );
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateUserLikedWorkshop).toEqual({
        id: createdWorkshopId,
      });
    });

    it('should return an empty liked workshops list', async () => {
      // given
      // when
      const response = await api.graphqlRequest(meFavoriteElementsQuery);
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.me.likedWorkshops).toHaveLength(0);
    });
  });

  describe('Like Shared Workshops', () => {
    it('should like workshop from other user', async () => {
      // given
      const fixture = await provideComplexTestWorkshopFixture(api, {
        isPublic: true,
      });
      const workshopId = fixture.givenWorkshopResponse.data?.createWorkshop.id;
      api.impersonateOtherActiveUser();
      // when
      await api.graphqlRequest(updateUserFavoriteElementMutation, {
        input: {
          workshopId,
          isLiked: true,
        },
      });
      const response = await api.graphqlRequest(meFavoriteElementsQuery);
      // then
      expect(response.data?.me.likedWorkshops.at(0)?.workshop.id).toBe(
        workshopId,
      );
    });
  });
});
