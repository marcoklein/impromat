import { ExecutionResult } from 'graphql';
import { ObjMap } from 'graphql/jsutils/ObjMap';
import {
  AddWorkshopMutation,
  ElementVisibility,
  WorkshopQueryQuery,
} from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import {
  createElementMutation,
  elementByIdQuery,
  searchElementsQuery,
} from './element-queries';
import { workshopElementById } from './workshop-element-queries';
import {
  createWorkshopMutation,
  updateWorkshopMutation,
  workshopByIdQuery,
} from './workshop-queries';

describe('Workshop Sharing', () => {
  let api: ApiTestSession;
  let givenWorkshopResponse: ExecutionResult<
    AddWorkshopMutation,
    ObjMap<unknown>
  >;
  let givenPublicFreezeElementId: string;
  let givenCustomElementId: string;
  let givenPublicWorkshopResponse: ExecutionResult<
    WorkshopQueryQuery,
    ObjMap<unknown>
  >;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('with public workshop', () => {
    beforeEach(async () => {
      // given
      await createTestWorkshop(true);
    });

    it('should allow public access on publicly shared workshop', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopByIdQuery, {
        workshopId: givenWorkshopResponse.data!.createWorkshop.id,
      });
      // then
      expectResponseToBeValidWorkshop(response);
    });

    it('should allow access on publicly shared workshop for logged in user', async () => {
      // given beforeEach
      // when
      api.impersonateOtherActiveUser();
      const response = await api.graphqlRequest(workshopByIdQuery, {
        workshopId: givenWorkshopResponse.data!.createWorkshop.id,
      });
      // then
      expectResponseToBeValidWorkshop(response);
    });

    it('should allow public access on workshop element based on improbib element', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopElementById, {
        id: givenPublicWorkshopResponse.data!.workshop.sections[0].elements[0]
          .id,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshopElement.id).toBe(
        givenPublicWorkshopResponse.data!.workshop.sections[0].elements[0].id,
      );
      expect(response.data?.workshopElement.note).toBe(
        'element based on improbib entry',
      );
    });

    it('should allow public access on workshop element based on custom element', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopElementById, {
        id: givenPublicWorkshopResponse.data!.workshop.sections[0].elements[1]
          .id,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshopElement.id).toEqual(
        givenPublicWorkshopResponse.data!.workshop.sections[0].elements[1].id,
      );
    });

    it('should allow public access on custom workshop element from public workshop', async () => {
      // given beforeEach
      const idOfCustomElement =
        givenPublicWorkshopResponse.data!.workshop.sections[0].elements[1]
          .basedOn.id;
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(elementByIdQuery, {
        id: idOfCustomElement,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.element?.id).toEqual(idOfCustomElement);
    });

    function expectResponseToBeValidWorkshop(
      response: ExecutionResult<WorkshopQueryQuery, ObjMap<unknown>>,
    ) {
      expect(response.errors).toBeUndefined();
      expect(response.data!.workshop.id).toBe(
        givenWorkshopResponse.data!.createWorkshop.id,
      );
      expect(response.data!.workshop.sections[0].elements[0].basedOn.id).toBe(
        givenPublicFreezeElementId,
      );
      expect(response.data!.workshop.sections[0].elements[1].basedOn.id).toBe(
        givenCustomElementId,
      );
      expect(response.data!.workshop.canEdit).toBeFalsy();
    }
  });

  describe('without public workshop', () => {
    beforeEach(async () => {
      // given
      await createTestWorkshop(false);
    });

    it('should not allow public access on unshared workshop', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopByIdQuery, {
        workshopId: givenWorkshopResponse.data!.createWorkshop.id,
      });
      // then
      expect(response.data).toBeNull();
      expect(response.errors).toBeDefined();
    });

    it('should not allow access on unshared workshop for logged in user', async () => {
      // given beforeEach
      // when
      api.impersonateOtherActiveUser();
      const response = await api.graphqlRequest(workshopByIdQuery, {
        workshopId: givenWorkshopResponse.data!.createWorkshop.id,
      });
      // then
      expect(response.data).toBeNull();
      expect(response.errors).toBeDefined();
    });

    it('should dissallow public access on workshop element based on improbib element', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopElementById, {
        id: givenPublicWorkshopResponse.data!.workshop.sections[0].elements[0]
          .id,
      });
      // then
      expect(response.data).toBeNull();
      expect(response.errors).toBeDefined();
    });

    it('should dissallow public access on workshop element based on custom element', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopElementById, {
        id: givenPublicWorkshopResponse.data!.workshop.sections[0].elements[1]
          .id,
      });
      // then
      expect(response.data).toBeNull();
      expect(response.errors).toBeDefined();
    });

    it('should not allow public access on custom element from unshared workshop', async () => {
      // given beforeEach
      const idOfCustomElement =
        givenPublicWorkshopResponse.data!.workshop.sections[0].elements[1]
          .basedOn.id;
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(elementByIdQuery, {
        id: idOfCustomElement,
      });
      // then
      expect(response.data?.element).toBeNull();
      expect(response.errors).toBeDefined();
    });
  });

  async function createTestWorkshop(isPublic: boolean) {
    api.impersonateActiveUser();
    givenWorkshopResponse = await api.graphqlRequest(createWorkshopMutation, {
      input: {
        name: 'test workshop',
      },
    });
    expect(givenWorkshopResponse.errors).toBe(undefined);
    const freezeSearchResponse = await api.graphqlRequest(searchElementsQuery, {
      input: {
        text: 'freeze',
        take: 1,
      },
    });
    givenPublicFreezeElementId =
      freezeSearchResponse.data!.searchElements[0].element.id;
    expect(givenPublicFreezeElementId).toBeDefined();
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
    givenCustomElementId = customElementResponse.data!.createElement.id;
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
    givenPublicWorkshopResponse = await api.graphqlRequest(workshopByIdQuery, {
      workshopId: givenWorkshopResponse.data!.createWorkshop.id,
    });
    expect(givenPublicWorkshopResponse.errors).toBeUndefined();
  }
});
