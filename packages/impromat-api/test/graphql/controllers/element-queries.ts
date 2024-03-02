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
    markdownShort
    visibility

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

export const elementByIdQuery = graphql(`
  query ElementByIdQuery($id: ID!) {
    element(id: $id) {
      ...ElementFields
    }
  }
`);

export const elementsQuery = graphql(`
  query ElementsQuery(
    $filter: ElementsFilterInput
    $orderBy: ElementsOrderByInput
    $skip: Int! = 0
    $take: Int! = 20
  ) {
    elements(filter: $filter, orderBy: $orderBy, skip: $skip, take: $take) {
      element {
        ...ElementFields
      }
    }
  }
`);

export const searchElementsQuery = graphql(`
  query SearchElementsQuery($input: ElementSearchInput!, $take: Int) {
    searchElements(input: $input, take: $take) {
      element {
        ...ElementFields
      }
    }
  }
`);

export const createElementMutation = graphql(`
  mutation CreateElementMutation($input: CreateElementInput!) {
    createElement(input: $input) {
      ...ElementFields
    }
  }
`);

export const updateElementMutation = graphql(`
  mutation UpdateElementMutation($input: UpdateElementInput!) {
    updateElement(input: $input) {
      id
      # ...ElementFields
    }
  }
`);
