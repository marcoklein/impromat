import { graphql } from 'test/graphql-client/gql';

export const workshopFieldsFragment = graphql(`
  fragment WorkshopFields on Workshop {
    id
    version
    createdAt
    updatedAt
    deleted

    name
    description
    sections {
      id
      version
      createdAt
      updatedAt
      deleted

      orderIndex
      name
      color
      isCollapsed

      elements {
        id
      }
      workshop {
        id
      }
    }
    owner {
      id
    }
  }
`);

export const userWorkshopsQuery = graphql(`
  query UserWorkshopsQuery {
    workshops {
      ...WorkshopFields
    }
  }
`);

export const workshopByIdQuery = graphql(`
  query WorkshopQuery($workshopId: ID!) {
    workshop(workshopId: $workshopId) {
      ...WorkshopFields
    }
  }
`);

export const addWorskshopWithEmptyNameQuery = graphql(`
  mutation AddWorkshopWithEmptyName {
    createWorkshop(input: { name: "" }) {
      ...WorkshopFields
    }
  }
`);

export const createWorkshopMutation = graphql(`
  mutation AddWorkshop($name: String!) {
    createWorkshop(input: { name: $name }) {
      ...WorkshopFields
    }
  }
`);

export const updateWorkshopMutation = graphql(`
  mutation UpdateWorkshop($input: UpdateWorkshopInput!) {
    updateWorkshop(input: $input) {
      ...WorkshopFields
    }
  }
`);
