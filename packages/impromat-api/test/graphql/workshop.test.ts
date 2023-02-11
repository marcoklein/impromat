import { ApiTestSession, initApiTestSession } from './describe-component-test';
import {
  addWorkshopQuery,
  addWorskshopWithEmptyNameQuery,
  workshopByIdQuery,
} from './workshop-queries';

describe('Workshop', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
  });

  describe('empty workshop', () => {
    let newWorkshopId: string;

    beforeAll(async () => {
      const response = await api.graphqlRequest(addWorkshopQuery, {
        name: 'empty workshop',
      });
      expect(response.errors).toBeUndefined();
      newWorkshopId = response.data!.createWorkshop.id;
    });

    it('should get workshop with default section and owner', async () => {
      // given
      const query = workshopByIdQuery;
      // when
      const response = await api.graphqlRequest(query, {
        workshopId: newWorkshopId,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshop).toBeDefined();
      expect(response.data?.workshop.id).toBe(newWorkshopId);
      expect(response.data?.workshop.sections).toHaveLength(1);
      expect(response.data?.workshop.owner.id).toBe(api.userId);
    });
  });

  describe('unhappy', () => {
    it('should not add a new workshop without a name', async () => {
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
