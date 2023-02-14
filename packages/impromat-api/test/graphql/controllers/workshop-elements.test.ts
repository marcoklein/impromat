import { AddWorkshopMutation } from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/describe-component-test';
import { createElementMutation } from './element-queries';
import {
  createWorkshopMutation,
  updateWorkshopMutation,
} from './workshop-queries';

describe('Workshop Elements', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
  });

  let createdElementId: string | undefined;
  beforeAll(async () => {
    const response = await api.graphqlRequest(createElementMutation, {
      input: {
        name: 'my-improv-game',
        markdown: 'test element',
      },
    });
    createdElementId = response.data?.createElement.id;
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
    it('should create a workshop element', async () => {
      // given
      if (!createdElementId) throw new Error('Element required for test.');
      const workshop = await ensureTestWorkshop();
      const testSectionId = workshop.sections[0].id;
      // when
      const response = await api.graphqlRequest(updateWorkshopMutation, {
        input: {
          id: workshop.id,
          sections: {
            update: [
              {
                id: testSectionId,
                elements: {
                  create: [
                    {
                      basedOn: {
                        connect: { id: createdElementId },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      const result = response.data!.updateWorkshop;
      expect(result.sections[0].elements).toHaveLength(1);
      expect(result.sections[0].elements[0].basedOn.name).toBe(
        'my-improv-game',
      );

      createdElementId = result.sections[0].elements[0].id;
    });
  });

  // describe('unhappy', () => {
  //   it('should not update workshop sections with arbitrary ids', async () => {
  //     // given
  //     const workshop = await ensureTestWorkshop();
  //     // when
  //     const response = await api.graphqlRequest(updateWorkshopMutation, {
  //       input: {
  //         id: workshop.id,
  //         sections: [
  //           {
  //             id: 'new id',
  //           },
  //         ],
  //       },
  //     });
  //     // then
  //     expect(response.errors).toHaveLength(1);
  //   });
  // });
});
