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
    canEdit
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
        note
        basedOn {
          id
          name
        }
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
    workshop(id: $workshopId) {
      ...WorkshopFields
    }
  }
`);

export const deleteWorkshopMutation = graphql(`
  mutation DeleteWorkshop($id: ID!) {
    deleteWorkshop(id: $id) {
      id
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

export const createWorkshopByNameMutation = graphql(`
  mutation AddWorkshopByName($name: String!) {
    createWorkshop(input: { name: $name }) {
      ...WorkshopFields
    }
  }
`);

export const createWorkshopMutation = graphql(`
  mutation AddWorkshop($input: CreateWorkshopInput!) {
    createWorkshop(input: $input) {
      ...WorkshopFields
    }
  }
`);

export const createTestWorkshopMutation = graphql(`
  mutation AddTestWorkshop {
    createWorkshop(input: { name: "test-workshop" }) {
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
