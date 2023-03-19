import { UUID4_REGEX } from 'test/test-utils/uuid4-regex';
import {
  ApiTestSession,
  initApiTestSession,
} from '../../test-utils/describe-component-test';
import { createElementMutation } from './element-queries';

describe('User Elements', () => {
  let api: ApiTestSession;
  beforeAll(async () => {
    api = await initApiTestSession();
  });

  describe('update elements', () => {
    let createdElementId: string | undefined;

    it('should create an element', async () => {
      // given
      // when
      const response = await api.graphqlRequest(createElementMutation, {
        input: {
          name: 'my-improv-game',
          markdown: 'test element',
        },
      });
      // then
      expect(response.errors).toBeUndefined();
      const result = response.data!.createElement;
      expect(result.name).toBe('my-improv-game');
      expect(result.markdown).toBe('test element');

      expect(result.id).toMatch(UUID4_REGEX);
      expect(result.version).toBe(0);
      expect(new Date(result.createdAt).getTime()).toBeGreaterThan(
        Date.now() - 1000,
      );
      expect(new Date(result.updatedAt).getTime()).toBeGreaterThan(
        Date.now() - 1000,
      );
      expect(result.deleted).toBe(false);

      createdElementId = result.id;
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
