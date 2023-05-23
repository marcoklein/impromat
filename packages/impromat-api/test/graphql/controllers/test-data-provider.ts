import assert from 'assert';
import { ElementVisibility } from 'test/graphql-client/graphql';
import { ApiTestSession } from 'test/test-utils/init-api-test-session';
import {
  createElementMutation,
  searchElementsQuery,
  updateUserFavoriteElementMutation,
} from './element-queries';

export class TestDataProvider {
  constructor(public api: ApiTestSession) {}

  async getIdOfPublicElementFreezeTag() {
    const api = this.api;
    const freezeSearchResponse = await api.graphqlRequest(searchElementsQuery, {
      input: {
        text: 'freeze',
        take: 1,
      },
    });
    const givenPublicFreezeElementId =
      freezeSearchResponse.data?.searchElements[0].element.id;
    assert(
      givenPublicFreezeElementId !== undefined,
      'Error while retrieving public element freeze tag.',
    );
    return givenPublicFreezeElementId;
  }

  async likeElementWithId(elementId: string) {
    const api = this.api;
    const result = await api.graphqlRequest(updateUserFavoriteElementMutation, {
      input: {
        elementId: elementId,
        isFavorite: true,
      },
    });
    assert(!result.errors, `Receeived errors ${JSON.stringify(result.errors)}`);
  }

  async createCustomElement() {
    const api = this.api;
    const customElementResponse = await api.graphqlRequest(
      createElementMutation,
      {
        input: {
          name: 'custom-improv-game',
          markdown: 'custom improv test game to be shared in workshop',
          visibility: ElementVisibility.Private,
        },
      },
    );
    const givenCustomElementId = customElementResponse.data?.createElement.id;
    assert(givenCustomElementId, 'Error while creating custom element.');
    return givenCustomElementId;
  }
}
