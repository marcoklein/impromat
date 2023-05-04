import { randomUUID } from 'node:crypto';
import { ElementVisibility } from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from 'test/test-utils/init-api-test-session';
import {
  createElementMutation,
  searchElementsQuery,
  userElementsQuery,
} from './element-queries';

describe('Sharing Workshop Elements', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it('should have no elements', async () => {
    // given
    // when
    const elements = await api.graphqlRequest(userElementsQuery);
    // then
    expect(elements.data?.elements?.length).toBe(0);
  });

  it('should have no elements if not shared', async () => {
    // given
    const uniqueElementName = `shared-test-user-element-from-first-user-${randomUUID()}`;
    // when
    api.impersonateActiveUser();
    await api.graphqlRequest(createElementMutation, {
      input: { name: uniqueElementName },
    });
    // then
    const elements = await api.graphqlRequest(searchElementsQuery, {
      input: { text: uniqueElementName },
    });
    api.impersonateOtherActiveUser();
    const elementsFromOtherUser = await api.graphqlRequest(
      searchElementsQuery,
      { input: { text: uniqueElementName } },
    );
    expect(elements.data?.searchElements?.at(0)?.element.name).toBe(
      uniqueElementName,
    );
    expect(elements.data?.searchElements?.at(0)?.element.isOwnerMe).toBe(true);
    expect(
      elementsFromOtherUser.data?.searchElements?.at(0)?.element.name ===
        uniqueElementName,
    ).toBeFalsy();
  }, 20000);

  it('should return publically shared element with correct owner settings', async () => {
    // given
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    // when
    api.impersonateActiveUser();
    await api.graphqlRequest(createElementMutation, {
      input: {
        name: uniqueElementName,
        visibility: ElementVisibility.Public,
      },
    });
    // then
    const elements = await api.graphqlRequest(searchElementsQuery, {
      input: { text: uniqueElementName },
    });
    api.impersonateOtherActiveUser();
    const elementsFromOtherUser = await api.graphqlRequest(
      searchElementsQuery,
      { input: { text: uniqueElementName } },
    );
    expect(elements.data?.searchElements?.at(0)?.element.name).toBe(
      uniqueElementName,
    );
    expect(elements.data?.searchElements?.at(0)?.element.isOwnerMe).toBe(true);
    expect(
      elementsFromOtherUser.data?.searchElements?.at(0)?.element.name,
    ).toBe(uniqueElementName);
    expect(
      elementsFromOtherUser.data?.searchElements?.at(0)?.element.isOwnerMe,
    ).toBe(false);
  }, 20000);

  it.skip('should return all published elements of a user', async () => {
    // given
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    // when
    await api.graphqlRequest(createElementMutation, {
      input: {
        name: uniqueElementName,
        visibility: ElementVisibility.Public,
      },
    });
    // then
    // TODO
  });
});
