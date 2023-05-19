import { ExecutionResult } from 'graphql';
import { ObjMap } from 'graphql/jsutils/ObjMap';
import { WorkshopQueryQuery } from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { elementByIdQuery } from './element-queries';
import { workshopElementById } from './workshop-element-queries';
import { workshopByIdQuery } from './workshop-queries';
import { provideComplexTestWorkshopFixture } from './workshop-fixture';

describe('Workshop Sharing', () => {
  let api: ApiTestSession;
  let fixture: Awaited<ReturnType<typeof provideComplexTestWorkshopFixture>>;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  describe('with public workshop', () => {
    beforeEach(async () => {
      // given
      fixture = await provideComplexTestWorkshopFixture(api, {
        isPublic: true,
      });
    });

    it('should allow public access on publicly shared workshop', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopByIdQuery, {
        workshopId: fixture.givenWorkshopResponse.data!.createWorkshop.id,
      });
      // then
      expectResponseToBeValidWorkshop(response);
    });

    it('should allow access on publicly shared workshop for logged in user', async () => {
      // given beforeEach
      // when
      api.impersonateOtherActiveUser();
      const response = await api.graphqlRequest(workshopByIdQuery, {
        workshopId: fixture.givenWorkshopResponse.data!.createWorkshop.id,
      });
      // then
      expectResponseToBeValidWorkshop(response);
    });

    it('should allow public access on workshop element based on improbib element', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopElementById, {
        id: fixture.givenPublicWorkshopResponse.data!.workshop.sections[0]
          .elements[0].id,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshopElement.id).toBe(
        fixture.givenPublicWorkshopResponse.data!.workshop.sections[0]
          .elements[0].id,
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
        id: fixture.givenPublicWorkshopResponse.data!.workshop.sections[0]
          .elements[1].id,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshopElement.id).toEqual(
        fixture.givenPublicWorkshopResponse.data!.workshop.sections[0]
          .elements[1].id,
      );
    });

    it('should allow public access on custom workshop element from public workshop', async () => {
      // given beforeEach
      const idOfCustomElement =
        fixture.givenPublicWorkshopResponse.data!.workshop.sections[0]
          .elements[1].basedOn.id;
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
        fixture.givenWorkshopResponse.data!.createWorkshop.id,
      );
      expect(response.data!.workshop.sections[0].elements[0].basedOn.id).toBe(
        fixture.givenPublicFreezeElementId,
      );
      expect(response.data!.workshop.sections[0].elements[1].basedOn.id).toBe(
        fixture.givenCustomElementId,
      );
      expect(response.data!.workshop.canEdit).toBeFalsy();
    }
  });

  describe('without public workshop', () => {
    beforeEach(async () => {
      // given
      fixture = await provideComplexTestWorkshopFixture(api, {
        isPublic: false,
      });
    });

    it('should not allow public access on unshared workshop', async () => {
      // given beforeEach
      // when
      api.impersonatePublicUser();
      const response = await api.graphqlRequest(workshopByIdQuery, {
        workshopId: fixture.givenWorkshopResponse.data!.createWorkshop.id,
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
        workshopId: fixture.givenWorkshopResponse.data!.createWorkshop.id,
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
        id: fixture.givenPublicWorkshopResponse.data!.workshop.sections[0]
          .elements[0].id,
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
        id: fixture.givenPublicWorkshopResponse.data!.workshop.sections[0]
          .elements[1].id,
      });
      // then
      expect(response.data).toBeNull();
      expect(response.errors).toBeDefined();
    });

    it('should not allow public access on custom element from unshared workshop', async () => {
      // given beforeEach
      const idOfCustomElement =
        fixture.givenPublicWorkshopResponse.data!.workshop.sections[0]
          .elements[1].basedOn.id;
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
});
