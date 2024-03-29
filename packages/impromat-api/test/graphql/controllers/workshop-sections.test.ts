import { AddWorkshopMutation } from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import {
  createTestWorkshopMutation,
  createWorkshopByNameMutation,
  updateWorkshopMutation,
  workshopByIdQuery,
} from './workshop-queries';

describe('Workshop Sections', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  let createdWorkshop: AddWorkshopMutation['createWorkshop'];
  async function ensureTestWorkshop() {
    if (createdWorkshop) return createdWorkshop;
    const response = await api.graphqlRequest(createWorkshopByNameMutation, {
      name: 'empty workshop',
    });
    createdWorkshop = response.data!.createWorkshop;
    return createdWorkshop;
  }

  describe('flow', () => {
    let newSectionId: string | undefined;
    it('should update workshop sections', async () => {
      // given
      const workshop = await ensureTestWorkshop();
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          name: 'super name',
          sections: {
            update: [
              {
                id: workshop.sections[0].id,
                orderIndex: 0,
              },
            ],
            create: [
              {
                name: 'new section',
                orderIndex: 1,
              },
            ],
          },
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateWorkshop.name).toBe('super name');
      const result = response.data!.updateWorkshop;
      expect(result.sections).toHaveLength(2);
      expect(result.sections[0].id).toBe(workshop.sections[0].id);
      expect(result.sections[0].orderIndex).toBe(0);
      expect(result.sections[1].name).toBe('new section');
      expect(result.sections[1].orderIndex).toBe(1);

      newSectionId = result.sections[1].id;
    });

    it('should read updated workshop', async () => {
      // given
      const query = workshopByIdQuery;
      const workshop = await ensureTestWorkshop();
      // when
      const response = await api.graphqlRequest(query, {
        workshopId: workshop.id,
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.workshop?.name).toBe('super name');
    });

    it('should delete section', async () => {
      // given
      const sectionId = newSectionId;
      if (!sectionId) throw new Error('Requires previous test');
      const workshop = await ensureTestWorkshop();
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          name: 'super name',
          sections: {
            delete: [{ id: sectionId }],
          },
        },
      });
      // then
      expect(response.errors).toBeUndefined();
    });

    it('should reorder sections', async () => {
      // given
      const workshop = await ensureTestWorkshop();
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          name: 'super name',
          sections: {
            create: [
              {
                name: 'first',
                orderIndex: 0,
              },
              {
                name: 'second',
                orderIndex: 1,
              },
            ],
            update: [
              {
                id: workshop.sections[0].id,
                name: 'third',
                orderIndex: 2,
              },
            ],
          },
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateWorkshop.name).toBe('super name');
      const result = response.data!.updateWorkshop;
      expect(result.sections).toHaveLength(3);
      expect(result.sections[0].orderIndex).toBe(0);
      expect(result.sections[0].name).toBe('first');
      expect(result.sections[1].orderIndex).toBe(1);
      expect(result.sections[1].name).toBe('second');
      expect(result.sections[2].orderIndex).toBe(2);
      expect(result.sections[2].name).toBe('third');
    });

    it('should append new sections in the end per default', async () => {
      // given
      const workshop = await ensureTestWorkshop();
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          name: 'super name',
          sections: {
            create: [
              {
                name: 'keep',
              },
              {
                name: 'order',
              },
            ],
          },
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateWorkshop.name).toBe('super name');
      const result = response.data!.updateWorkshop;
      expect(result.sections).toHaveLength(5);
      expect(result.sections[3].orderIndex).toBe(3);
      expect(result.sections[3].name).toBe('keep');
      expect(result.sections[4].orderIndex).toBe(4);
      expect(result.sections[4].name).toBe('order');
    });
  });

  describe('happy', () => {
    it('should create a new section if there is only one section after delete', async () => {
      // given
      const testWorkshopResponse = await api.graphqlRequest(
        createTestWorkshopMutation,
      );
      const workshopId = testWorkshopResponse.data!.createWorkshop.id;
      const firstSectionId =
        testWorkshopResponse.data!.createWorkshop.sections.at(0)!.id;
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshopId,
          name: 'super name',
          sections: {
            delete: [{ id: firstSectionId }],
          },
        },
      });
      // then
      expect(response.data?.updateWorkshop.sections).toHaveLength(1);
      expect(response.data?.updateWorkshop.sections.at(0)?.id).not.toBe(
        firstSectionId,
      );
    });

    it('should delete a section', async () => {
      // given
      const testWorkshopResponse = await api.graphqlRequest(
        createTestWorkshopMutation,
      );
      const workshopId = testWorkshopResponse.data!.createWorkshop.id;
      const firstSectionId =
        testWorkshopResponse.data!.createWorkshop.sections.at(0)!.id;
      await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshopId,
          sections: {
            create: [{ name: 'second' }, { name: 'third' }],
          },
        },
      });
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshopId,
          sections: {
            delete: [{ id: firstSectionId }],
          },
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      expect(response.data?.updateWorkshop.sections).toHaveLength(2);
      // TODO test if order index is correct
      // expect(response.data?.updateWorkshop.sections[])
    });
  });

  describe('unhappy', () => {
    it('should not update workshop sections with arbitrary ids', async () => {
      // given
      const workshop = await ensureTestWorkshop();
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          sections: {
            update: [
              {
                id: 'new id',
              },
            ],
          },
        },
      });
      // then
      expect(response.errors).toHaveLength(1);
    });
  });
});
