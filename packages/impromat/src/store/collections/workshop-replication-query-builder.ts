import {
  RxGraphQLReplicationPullQueryBuilder,
  RxGraphQLReplicationPushQueryBuilder,
} from "rxdb";
import {
  PullCheckpointInput,
  WorkshopPushRowInput,
} from "../../graphql/schema.gen";

// TODO generate this query from the generated schema
// it is fatal if one field is not synced because that yield unpredictable behavior!
// (e.g. if the isVisible attribute is not synced then suddenly sections on other devices disappear)
export const WORKSHOP_FIELDS_FRAGMENT = /* GraphQL */ `
  fragment WorkshopFields on Workshop {
    id
    version
    deleted
    name
    description
    sections {
      id
    }
  }
`;

export const pushQueryBuilder: RxGraphQLReplicationPushQueryBuilder = (
  pushRows: WorkshopPushRowInput[],
) => {
  const query = /* GraphQL */ `
    mutation SetWorkshops($workshopPushRows: [WorkshopPushRowInput!]!) {
      pushWorkshops(workshopPushRows: $workshopPushRows) {
        ...WorkshopFields
      }
    }
    ${WORKSHOP_FIELDS_FRAGMENT}
  `;
  return {
    query,
    variables: {
      workshopPushRows: pushRows,
    },
  };
};

export const pullQueryBuilder: RxGraphQLReplicationPullQueryBuilder<
  PullCheckpointInput
> = (latestPulledCheckpoint, limit) => {
  const query = /* GraphQL */ `
    query FetchWorkshops($checkpoint: PullCheckpointInput!, $limit: Int!) {
      pullWorkshops(checkpoint: $checkpoint, limit: $limit) {
        documents {
          ...WorkshopFields
        }
        checkpoint {
          id
          updatedAt
        }
      }
    }
    ${WORKSHOP_FIELDS_FRAGMENT}
  `;
  return {
    query,
    variables: {
      limit: limit,
      checkpoint: latestPulledCheckpoint ?? { id: "", updatedAt: 0 },
    },
  };
};
