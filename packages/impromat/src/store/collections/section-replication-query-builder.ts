import {
  RxGraphQLReplicationPullQueryBuilder,
  RxGraphQLReplicationPushQueryBuilder,
} from "rxdb";

const QUERY_FIELDS_FRAGMENT = /* GraphQL */ `
  fragment QueryFields on Section {
    id
    version
    name
    elements {
      id
    }
    note
    color
    isVisible
    isCollapsed
  }
`;

export const sectionPushQueryBuilder: RxGraphQLReplicationPushQueryBuilder = (
  pushRows,
) => {
  const query = /* GraphQL */ `
    mutation PushMutation($sectionPushRows: [SectionPushRowInput!]!) {
      pushSections(sectionPushRows: $sectionPushRows) {
        ...QueryFields
      }
    }
    ${QUERY_FIELDS_FRAGMENT}
  `;
  return {
    query,
    variables: {
      sectionPushRows: pushRows,
    },
  };
};

export const sectionPullQueryBuilder: RxGraphQLReplicationPullQueryBuilder<
  number
> = (latestPulledCheckpoint, limit) => {
  const query = /* GraphQL */ `
    query PullQuery($checkpoint: PullCheckpointInput!, $limit: Int!) {
      pullSections(checkpoint: $checkpoint, limit: $limit) {
        documents {
          ...QueryFields
        }
        checkpoint {
          id
          updatedAt
        }
      }
    }
    ${QUERY_FIELDS_FRAGMENT}
  `;
  return {
    query,
    variables: {
      limit: limit,
      checkpoint: latestPulledCheckpoint || { id: "", updatedAt: 0 },
    },
  };
};
