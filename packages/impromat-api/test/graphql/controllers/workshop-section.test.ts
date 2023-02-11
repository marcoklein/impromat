import { AddWorkshopMutation } from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/describe-component-test';
import {
  addWorskshopWithEmptyNameQuery,
  createWorkshopMutation,
  updateWorkshopMutation,
  workshopByIdQuery,
} from './workshop-queries';

describe('Workshop Sections', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
  });
  let createdWorkshop: AddWorkshopMutation['createWorkshop'];
  beforeAll(async () => {
    const response = await api.graphqlRequest(createWorkshopMutation, {
      name: 'empty workshop',
    });
    createdWorkshop = response.data!.createWorkshop;
  });

  describe('update workshop', () => {
    it('should update workshop sections', async () => {
      // given
      const workshop = createdWorkshop;
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          name: 'super name',
          sections: [
            {
              id: workshop.sections[0].id,
            },
            {
              name: 'new section',
            },
          ],
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateWorkshop.name).toBe('super name');
    });

    it('should not change ommited fields', async () => {
      // given
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: createdWorkshop.id,
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateWorkshop.name).toBe('super name');
    });

    it('should read updated workshop', async () => {
      // given
      const query = workshopByIdQuery;
      // when
      const response = await api.graphqlRequest(query, {
        workshopId: createdWorkshop.id,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshop.name).toBe('super name');
    });
  });

  describe('unhappy', () => {
    it('should not add a new workshop with an empty name', async () => {
      // given
      const query = addWorskshopWithEmptyNameQuery;
      // when
      const response = await api.graphqlRequest(query);
      // then
      expect(response.errors).toHaveLength(1);
      const error = response.errors![0];
      expect(error.message).toContain('Bad Request Exception');
    });
  });
});
