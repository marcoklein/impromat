import { graphql } from 'test/graphql-client/gql';

export const elementFieldsFragment = graphql(`
  fragment ElementFields on Element {
    id
    version
    createdAt
    updatedAt
    deleted

    name
    markdown

    tags {
      id
    }
    usedBy {
      id
    }
    owner {
      id
    }
    isOwnerMe
  }
`);

export const userElementsQuery = graphql(`
  query UserElementsQuery {
    elements {
      ...ElementFields
    }
  }
`);

export const elementsQuery = graphql(`
  query ElementsQuery($filter: ElementFilter!) {
    elements(filter: $filter) {
      ...ElementFields
    }
  }
`);

export const searchElementsQuery = graphql(`
  query SearchElementsQuery($input: ElementSearchInput!) {
    searchElements(input: $input) {
      element {
        ...ElementFields
      }
    }
  }
`);

export const createElementMutation = graphql(`
  mutation AddElementQuery($input: CreateElementInput!) {
    createElement(input: $input) {
      ...ElementFields
    }
  }
`);

export const updateElementMutation = graphql(`
  mutation UpdateElement($input: UpdateWorkshopInput!) {
    updateWorkshop(input: $input) {
      ...WorkshopFields
    }
  }
`);
