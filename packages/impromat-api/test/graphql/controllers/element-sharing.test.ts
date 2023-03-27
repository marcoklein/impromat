import { randomUUID } from 'node:crypto';
import { ElementVisibility } from 'test/graphql-client/graphql';
import { initApiTestSession } from '../../test-utils/describe-component-test';
import {
  createElementMutation,
  searchElementsQuery,
  userElementsQuery,
} from './element-queries';

describe('Sharing Workshop Elements', () => {
  it('should have no elements', async () => {
    // given
    const api = await initApiTestSession();
    // when
    const elements = await api.graphqlRequest(userElementsQuery);
    // then
    expect(elements.data?.elements?.length).toBe(0);
  });

  it('should have no elements if not shared', async () => {
    // given
    const apiWithUserElement = await initApiTestSession();
    const apiWithoutUserElement = await initApiTestSession();
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    // when
    await apiWithUserElement.graphqlRequest(createElementMutation, {
      input: { name: uniqueElementName },
    });
    // then
    const elements = await apiWithUserElement.graphqlRequest(
      searchElementsQuery,
      { input: { text: uniqueElementName } },
    );
    const elementsFromOtherUser = await apiWithoutUserElement.graphqlRequest(
      searchElementsQuery,
      { input: { text: uniqueElementName } },
    );
    expect(elements.data?.searchElements?.at(0)?.element.name).toBe(
      uniqueElementName,
    );
    expect(
      elementsFromOtherUser.data?.searchElements?.at(0)?.element.name ===
        uniqueElementName,
    ).toBeFalsy();
  });

  it('should return publically shared element', async () => {
    // given
    const apiWithPublishedUserElement = await initApiTestSession();
    const apiWithoutUserElement = await initApiTestSession();
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    // when
    await apiWithPublishedUserElement.graphqlRequest(createElementMutation, {
      input: {
        name: uniqueElementName,
        visibility: ElementVisibility.Public,
      },
    });
    // then
    const elements = await apiWithPublishedUserElement.graphqlRequest(
      searchElementsQuery,
      { input: { text: uniqueElementName } },
    );
    const elementsFromOtherUser = await apiWithoutUserElement.graphqlRequest(
      searchElementsQuery,
      { input: { text: uniqueElementName } },
    );
    expect(elements.data?.searchElements?.at(0)?.element.name).toBe(
      uniqueElementName,
    );
    expect(
      elementsFromOtherUser.data?.searchElements?.at(0)?.element.name,
    ).toBe(uniqueElementName);
  });

  it.skip('should return all published elements of a user', async () => {
    // given
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    const api = await initApiTestSession();
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
