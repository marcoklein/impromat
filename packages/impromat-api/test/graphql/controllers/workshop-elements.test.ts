import { AddWorkshopMutation } from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/describe-component-test';
import {
  createWorkshopMutation,
  updateWorkshopMutation,
  workshopByIdQuery,
} from './workshop-queries';

xdescribe('Workshop Elements', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
  });

  let createdWorkshop: AddWorkshopMutation['createWorkshop'];
  async function ensureTestWorkshop() {
    if (createdWorkshop) return createdWorkshop;
    const response = await api.graphqlRequest(createWorkshopMutation, {
      name: 'empty workshop',
    });
    createdWorkshop = response.data!.createWorkshop;
    return createdWorkshop;
  }

  describe('update elements', () => {
    let createdElementId: string | undefined;
    it('should create an element', async () => {
      // given
      const workshop = await ensureTestWorkshop();
      const testSectionId = workshop.sections[0].id;
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          sections: [
            {
              id: testSectionId,
              elements: {
                create: [
                  {
                    name: 'new element',
                  },
                ],
              },
            },
          ],
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      const result = response.data!.updateWorkshop;
      expect(result.sections[0].elements).toHaveLength(1);

      createdElementId = result.sections[0].elements[0].id;
    });

    it('should update created element', async () => {
      // given
      const testElementId = createdElementId;
      if (!testElementId) throw new Error('Previous test required.');
      const workshop = await ensureTestWorkshop();
      const testSectionId = workshop.sections[0].id;
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          sections: [
            {
              id: testSectionId,
              // elements: [
              //   {
              //     name: 'new element',
              //   },
              // ],
            },
          ],
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      const result = response.data!.updateWorkshop;
      expect(result.sections[0].elements).toHaveLength(1);

      createdElementId = result.sections[0].elements[0].id;
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
      expect(response.data?.workshop.name).toBe('super name');
    });

    it('should reorder sections', async () => {
      // given
      const workshop = await ensureTestWorkshop();
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          name: 'super name',
          sections: [
            {
              name: 'first',
            },
            {
              name: 'second',
            },
            {
              id: workshop.sections[0].id,
              name: 'third',
            },
          ],
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
  });

  describe('unhappy', () => {
    it('should not update workshop sections with arbitrary ids', async () => {
      // given
      const workshop = await ensureTestWorkshop();
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          sections: [
            {
              id: 'new id',
            },
          ],
        },
      });
      // then
      expect(response.errors).toHaveLength(1);
    });
  });
});
