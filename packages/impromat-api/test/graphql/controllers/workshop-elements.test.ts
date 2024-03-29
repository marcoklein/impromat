import {
  AddWorkshopMutation,
  ElementVisibility,
} from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/init-api-test-session';
import { createElementMutation } from './element-queries';
import {
  createWorkshopByNameMutation,
  updateWorkshopMutation,
} from './workshop-queries';

describe('Workshop Elements', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  let createdElementId: string | undefined;
  beforeAll(async () => {
    const response = await api.graphqlRequest(createElementMutation, {
      input: {
        languageCode: 'en',
        visibility: ElementVisibility.Private,
        name: 'my-improv-game',
        markdown: 'test element',
      },
    });
    createdElementId = response.data?.createElement.id;
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

  it('should create a workshop element for a certain section', async () => {
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
    expect(result.sections[0].elements[0].basedOn.name).toBe('my-improv-game');
    expect(result.sections[0].elements[0].note).toBeNull();

    createdElementId = result.sections[0].elements[0].id;
  });

  it('should update a workshop element', async () => {
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
                update: [
                  {
                    id: createdElementId,
                    note: 'test-note',
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
    expect(result.sections[0].elements[0].basedOn.name).toBe('my-improv-game');
    expect(result.sections[0].elements[0].note).toBe('test-note');
  });

  it('should delete a workshop element', async () => {
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
                delete: [
                  {
                    id: createdElementId,
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
    expect(result.sections[0].elements).toHaveLength(0);
  });
});
