import { randomUUID } from 'node:crypto';
import { ElementVisibility } from 'test/graphql-client/graphql';
import {
  ApiTestSession,
  initApiTestSession,
} from 'test/test-utils/init-api-test-session';
import {
  createElementMutation,
  elementByIdQuery,
  searchElementsQuery,
  updateElementMutation,
} from './element-queries';

describe('Sharing Elements', () => {
  let api: ApiTestSession;

  beforeAll(async () => {
    api = await initApiTestSession();
  });

  afterAll(async () => {
    await api.destroy();
  });

  it('should have 0 owning elements per default', async () => {
    // given
    // when
    const elements = await api.graphqlRequest(searchElementsQuery, {
      input: { ownElement: true },
    });
    // then
    expect(elements.data?.searchElements?.length).toBe(0);
  });

  it('should not allow fetching of unshared element', async () => {
    // given
    // when
    api.impersonateActiveUser();
    const createdElement = await api.graphqlRequest(createElementMutation, {
      input: {
        name: `unique-element-name-${randomUUID()}`,
        languageCode: 'en',
        visibility: ElementVisibility.Private,
      },
    });
    api.impersonateOtherActiveUser();
    const response = await api.graphqlRequest(elementByIdQuery, {
      id: createdElement.data?.createElement.id,
    });
    // then
    expect(
      response.errors?.filter((error) => error.message === 'No Element found'),
    ).toHaveLength(1);
    expect(response.errors).toHaveLength(1);
  });

  it('should allow fetching of shared element', async () => {
    // given
    const uniqueElementName = `unique-element-name-${randomUUID()}`;
    // when
    api.impersonateActiveUser();
    const createdElement = await api.graphqlRequest(createElementMutation, {
      input: {
        languageCode: 'en',
        name: uniqueElementName,
        visibility: ElementVisibility.Public,
      },
    });
    api.impersonateOtherActiveUser();
    const response = await api.graphqlRequest(elementByIdQuery, {
      id: createdElement.data?.createElement.id,
    });
    // then
    expect(response.errors).toBeUndefined();
    expect(response.data?.element?.name).toBe(uniqueElementName);
  });

  it('should return isOwnerMe false if the owner is not the current user', async () => {
    // given
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    // when
    api.impersonateActiveUser();
    const createdElement = await api.graphqlRequest(createElementMutation, {
      input: {
        languageCode: 'en',
        name: uniqueElementName,
        visibility: ElementVisibility.Public,
      },
    });
    api.impersonateOtherActiveUser();
    const element = await api.graphqlRequest(elementByIdQuery, {
      id: createdElement.data!.createElement.id,
    });
    // then
    expect(element.data?.element?.isOwnerMe).toBe(false);
  });

  it('should list publicly edited element', async () => {
    // given
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    // when
    api.impersonateActiveUser();
    const createdElement = await api.graphqlRequest(createElementMutation, {
      input: {
        languageCode: 'en',
        name: uniqueElementName,
        visibility: ElementVisibility.Public,
      },
    });
    expect(createdElement.errors).toBeUndefined();
    api.impersonateOtherActiveUser();
    const updatedElementResponse = await api.graphqlRequest(
      updateElementMutation,
      {
        input: {
          id: createdElement.data!.createElement.id,
          markdown: 'updated-description',
          visibility: ElementVisibility.Public,
        },
      },
    );
    expect(updatedElementResponse.errors).toBeUndefined();
    const elements = await api.graphqlRequest(searchElementsQuery, {
      input: { text: uniqueElementName },
      take: 10,
    });
    // then
    expect(elements.errors).toBeUndefined();
    const elementsWithName = elements.data!.searchElements.filter(
      (element) => element.element.name === uniqueElementName,
    );
    expect(elementsWithName).toHaveLength(1);
    expect(elementsWithName[0].element.markdown).toBe('updated-description');
  });

  it('should edit a publicly listed element of another user', async () => {
    // given
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    // when
    api.impersonateActiveUser();
    const createdElement = await api.graphqlRequest(createElementMutation, {
      input: {
        languageCode: 'en',
        name: uniqueElementName,
        visibility: ElementVisibility.Public,
      },
    });
    expect(createdElement.errors).toBeUndefined();
    api.impersonateOtherActiveUser();
    const updatedElementResponse = await api.graphqlRequest(
      updateElementMutation,
      {
        input: {
          id: createdElement.data!.createElement.id,
          markdown: 'updated-description',
          visibility: ElementVisibility.Public,
        },
      },
    );
    expect(updatedElementResponse.errors).toBeUndefined();
    const response = await api.graphqlRequest(elementByIdQuery, {
      id: createdElement.data?.createElement.id,
    });
    // then
    expect(response.errors).toBeUndefined();
    expect(response.data?.element!.markdown).toBe('updated-description');
  });

  it('should disallow changes to the visibility state for other users', async () => {
    // given
    const uniqueElementName = `shared-test-user-element-${randomUUID()}`;
    // when
    api.impersonateActiveUser();
    const createdElement = await api.graphqlRequest(createElementMutation, {
      input: {
        languageCode: 'en',
        name: uniqueElementName,
        visibility: ElementVisibility.Public,
      },
    });
    expect(createdElement.errors).toBeUndefined();
    api.impersonateOtherActiveUser();
    const updatedElementResponse = await api.graphqlRequest(
      updateElementMutation,
      {
        input: {
          id: createdElement.data!.createElement.id,
          visibility: ElementVisibility.Private,
        },
      },
    );
    // then
    expect(updatedElementResponse.errors).toBeDefined();
  });
});
