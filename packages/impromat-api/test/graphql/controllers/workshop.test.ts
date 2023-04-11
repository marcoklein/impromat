import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import {
  addWorskshopWithEmptyNameQuery,
  createWorkshopMutation,
  deleteWorkshopMutation,
  updateWorkshopMutation,
  workshopByIdQuery,
} from './workshop-queries';

describe('Workshop', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  let createdWorkshopId: string;

  describe('create workshop', () => {
    it('should create empty workshop', async () => {
      // given
      // when
      const response = await api.graphqlRequest(createWorkshopMutation, {
        name: 'empty workshop',
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.errors).toBeUndefined();
      const workshop = response.data!.createWorkshop;
      expect(workshop).toBeDefined();
      expect(workshop.sections).toHaveLength(1);
      expect(workshop.sections[0].name).toBeNull();
      expect(workshop.owner.id).toBe(api.userId);

      createdWorkshopId = response.data!.createWorkshop.id;
    });

    it('should read workshop with default section and owner', async () => {
      // given
      const query = workshopByIdQuery;
      // when
      const response = await api.graphqlRequest(query, {
        workshopId: createdWorkshopId,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshop).toBeDefined();
      expect(response.data?.workshop.id).toBe(createdWorkshopId);
      expect(response.data?.workshop.sections).toHaveLength(1);
      expect(response.data?.workshop.sections[0].name).toBeNull();
      expect(response.data?.workshop.sections[0].orderIndex).toBe(0);
      expect(response.data?.workshop.owner.id).toBe(api.userId);
    });
  });

  describe('update workshop', () => {
    it('should update created workshop', async () => {
      // given
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: createdWorkshopId,
          name: 'super name',
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
          id: createdWorkshopId,
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
        workshopId: createdWorkshopId,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshop.name).toBe('super name');
    });

    it('should delete workshop', async () => {
      // given
      const query = deleteWorkshopMutation;
      // when
      const response = await api.graphqlRequest(query, {
        id: createdWorkshopId,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.deleteWorkshop?.id).toBe(createdWorkshopId);
    });

    it('should not delete workshop twice', async () => {
      // given
      const query = deleteWorkshopMutation;
      // when
      const response = await api.graphqlRequest(query, {
        id: createdWorkshopId,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.deleteWorkshop).toBeNull();
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
