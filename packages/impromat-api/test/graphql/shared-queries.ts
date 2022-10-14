import { gql } from "graphql-request";

export const PULL_WORKSHOPS_QUERY = gql`
  query PullWorkshops($checkpoint: PullCheckpointInput!, $limit: Int!) {
    pullWorkshops(checkpoint: $checkpoint, limit: $limit) {
      checkpoint {
        id
        updatedAt
      }
      documents {
        id
        updatedAt
        deleted
        name
        description
        sections {
          id
          name
          elements {
            id
            name
          }
        }
      }
    }
  }
`;

export const PUSH_WORKSHOPS_MUTATION = gql`
  mutation PushWorkshopsMutation($workshopPushRows: [WorkshopPushRowInput!]!) {
    pushWorkshops(workshopPushRows: $workshopPushRows) {
      id
      updatedAt
      deleted
      name
      description
      sections {
        id
        elements {
          id
        }
      }
    }
  }
`;
