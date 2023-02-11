import { graphql } from 'test/graphql-client';

export const userWorkshopsQuery = graphql(`
  query UserWorkshopsQuery {
    userWorkshops {
      id
      name
      description
      sections {
        id
        name
      }
      owner {
        id
      }
    }
  }
`);

export const workshopByIdQuery = graphql(`
  query WorkshopQuery($workshopId: ID!) {
    workshop(id: $workshopId) {
      id
      name
      description
      sections {
        id
        name
      }
      owner {
        id
      }
    }
  }
`);

export const addWorskshopWithEmptyNameQuery = graphql(`
  mutation AddWorkshopWithEmptyName {
    createWorkshop(workshop: { name: "" }) {
      id
      name
    }
  }
`);

export const addWorkshopQuery = graphql(`
  mutation AddWorkshop($name: String!) {
    createWorkshop(workshop: { name: $name }) {
      id
      version
      createdAt
      updatedAt
      deleted

      name
    }
  }
`);
