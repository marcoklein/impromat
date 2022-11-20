import {
  RxGraphQLReplicationPullQueryBuilder,
  RxGraphQLReplicationPushQueryBuilder,
} from "rxdb";

const QUERY_FIELDS_FRAGMENT = /* GraphQL */ `
  fragment QueryFields on Element {
    id
    version
    name
    markdown
    tags
    note
    basedOn {
      id
    }
    languageCode
    sourceUrl
    sourceName
    sourceBaseUrl
    licenseName
    licenseUrl
  }
`;

export const elementPushQueryBuilder: RxGraphQLReplicationPushQueryBuilder = (
  pushRows,
) => {
  const query = /* GraphQL */ `
    mutation PushMutation($elementPushRows: [ElementPushRowInput!]!) {
      pushElements(elementPushRows: $workshopPushRows) {
        ...QueryFields
      }
    }
    ${QUERY_FIELDS_FRAGMENT}
  `;
  return {
    query,
    variables: {
      elementPushRows: pushRows,
    },
  };
};

export const elementPullQueryBuilder: RxGraphQLReplicationPullQueryBuilder<
  number
> = (latestPulledCheckpoint, limit) => {
  const query = /* GraphQL */ `
    query PullQuery($checkpoint: PullCheckpointInput!, $limit: Int!) {
      pullElements(checkpoint: $checkpoint, limit: $limit) {
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
