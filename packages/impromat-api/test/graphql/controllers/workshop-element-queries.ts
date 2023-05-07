import { graphql } from 'test/graphql-client/gql';

export const workshopElementFieldsFragment = graphql(`
  fragment WorkshopElementFields on WorkshopElement {
    id
    version
    note
  }
`);

export const workshopElementById = graphql(`
  query WorkshopElementByIdQuery($id: ID!) {
    workshopElement(id: $id) {
      ...WorkshopElementFields
    }
  }
`);
