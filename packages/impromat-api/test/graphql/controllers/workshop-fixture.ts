import { ElementVisibility } from 'test/graphql-client/graphql';
import { ApiTestSession } from 'test/test-utils/init-api-test-session';
import { createElementMutation, searchElementsQuery } from './element-queries';
import {
  createWorkshopMutation,
  updateWorkshopMutation,
  workshopByIdQuery,
} from './workshop-queries';

export async function provideComplexTestWorkshopFixture(
  api: ApiTestSession,
  options: { isPublic: boolean },
) {
  const isPublic = options.isPublic;
  api.impersonateActiveUser();
  const givenWorkshopResponse = await api.graphqlRequest(
    createWorkshopMutation,
    {
      input: {
        name: 'test workshop',
      },
    },
  );
  expect(givenWorkshopResponse.errors).toBe(undefined);
  const freezeSearchResponse = await api.graphqlRequest(searchElementsQuery, {
    input: {
      text: 'freeze',
    },
    take: 1,
  });
  const givenPublicFreezeElementId =
    freezeSearchResponse.data!.searchElements[0].element.id;
  expect(givenPublicFreezeElementId).toBeDefined();
  const customElementResponse = await api.graphqlRequest(
    createElementMutation,
    {
      input: {
        languageCode: 'en',
        name: 'custom-improv-game',
        markdown: 'custom improv test game to be shared in workshop',
        visibility: ElementVisibility.Private,
      },
    },
  );
  const givenCustomElementId = customElementResponse.data!.createElement.id;
  expect(customElementResponse.errors).toBeUndefined();
  const updateResponse = await api.graphqlRequest(updateWorkshopMutation, {
    input: {
      id: givenWorkshopResponse.data!.createWorkshop.id,
      isPublic,
      sections: {
        update: [
          {
            id: givenWorkshopResponse.data!.createWorkshop.sections[0].id,
            elements: {
              create: [
                {
                  basedOn: { connect: { id: givenPublicFreezeElementId } },
                  note: 'element based on improbib entry',
                },
                {
                  basedOn: {
                    connect: {
                      id: customElementResponse.data!.createElement.id,
                    },
                  },
                  note: 'custom element',
                },
              ],
            },
          },
        ],
      },
    },
  });
  expect(updateResponse.errors).toBeUndefined();
  const givenPublicWorkshopResponse = await api.graphqlRequest(
    workshopByIdQuery,
    {
      workshopId: givenWorkshopResponse.data!.createWorkshop.id,
    },
  );
  expect(givenPublicWorkshopResponse.errors).toBeUndefined();

  return {
    givenWorkshopResponse,
    givenPublicFreezeElementId,
    givenCustomElementId,
    givenPublicWorkshopResponse,
  };
}
