import assert from 'assert';
import { graphql } from 'test/graphql-client';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { createElementMutation } from './element-queries';
import { ElementVisibility } from 'test/graphql-client/graphql';

const updateUserFavoriteElementMutation = graphql(`
  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {
    updateUserFavoriteElement(input: $input) {
      id
    }
  }
`);

const meFavoriteElementsQuery = graphql(`
  query MeFavoriteElements {
    me {
      favoriteElements {
        element {
          id
        }
      }
    }
  }
`);

describe('User Favorite Elements', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  let createdElementId: string;

  it('should not return isFavorite for element', async () => {
    // given
    const createElementResponse = await api.graphqlRequest(
      createElementMutation,
      {
        input: {
          languageCode: 'en',
          visibility: ElementVisibility.Private,
          name: 'my-improv-game',
          markdown: 'test element',
        },
      },
    );
    // when
    const response = await api.graphqlRequest(
      graphql(`
        query ElementIsFavorite($id: ID!) {
          element(id: $id) {
            isFavorite
          }
        }
      `),
      {
        id: createElementResponse.data!.createElement.id,
      },
    );
    // then
    expect(response.errors).toBeUndefined();
    expect(response.data?.element?.isFavorite).toBe(false);
  });

  it('should mark element as favorite', async () => {
    // given
    const createElementResponse = await api.graphqlRequest(
      createElementMutation,
      {
        input: {
          languageCode: 'en',
          visibility: ElementVisibility.Private,
          name: 'my-improv-game',
          markdown: 'test element',
        },
      },
    );
    assert(createElementResponse.data?.createElement.id);
    // when
    const response = await api.graphqlRequest(
      updateUserFavoriteElementMutation,
      {
        input: {
          elementId: createElementResponse.data.createElement.id,
          isFavorite: true,
        },
      },
    );
    // then
    expect(response.errors).toBeUndefined();
    expect(response.data?.updateUserFavoriteElement?.id).toBe(
      createElementResponse.data.createElement.id,
    );
    createdElementId = createElementResponse.data.createElement.id;
  });

  it('should get favorite element from me query', async () => {
    // given
    assert(createdElementId, 'requires previous test');
    // when
    const response = await api.graphqlRequest(meFavoriteElementsQuery);
    // then
    expect(response.errors).toBeUndefined();
    expect(response.data?.me.favoriteElements).toHaveLength(1);
    expect(response.data?.me.favoriteElements[0].element.id).toBe(
      createdElementId,
    );
  });

  it('should return isFavorite for element', async () => {
    // given
    assert(createdElementId, 'requires previous test');
    // when
    const response = await api.graphqlRequest(
      graphql(`
        query ElementIsFavorite($id: ID!) {
          element(id: $id) {
            isFavorite
          }
        }
      `),
      {
        id: createdElementId,
      },
    );
    // then
    expect(response.errors).toBeUndefined();
    expect(response.data?.element?.isFavorite).toBe(true);
  });

  it('should remove element from favorites', async () => {
    // given
    assert(createdElementId, 'requires previous test');
    // when
    const response = await api.graphqlRequest(
      updateUserFavoriteElementMutation,
      {
        input: {
          elementId: createdElementId,
          isFavorite: false,
        },
      },
    );
    // then
    expect(response.errors).toBeUndefined();
    expect(response.data?.updateUserFavoriteElement).toEqual({
      id: createdElementId,
    });
  });

  it('should return an empty favorites list', async () => {
    // given
    // when
    const response = await api.graphqlRequest(meFavoriteElementsQuery);
    // then
    expect(response.errors).toBeUndefined();
    expect(response.data?.me.favoriteElements).toHaveLength(0);
  });
});
