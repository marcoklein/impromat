import {
  RxGraphQLReplicationPullQueryBuilder,
  RxGraphQLReplicationPushQueryBuilder,
} from "rxdb";

// TODO generate this query from the generated schema
// it is fatal if one field is not synced because that yield unpredictable behavior!
// (e.g. if the isVisible attribute is not synced then suddenly sections on other devices disappear)
export const USER_FIELDS_FRAGMENT = /* GraphQL */ `
  fragment UserFields on User {
    id
    version
    favoriteElements {
      id
    }
  }
`;

export const userPushQueryBuilder: RxGraphQLReplicationPushQueryBuilder = (
  pushRows,
) => {
  const query = /* GraphQL */ `
    mutation PushMutation($userPushRows: [UserPushRowInput!]!) {
      pushUsers(userPushRows: $userPushRows) {
        ...UserFields
      }
    }
    ${USER_FIELDS_FRAGMENT}
  `;
  return {
    query,
    variables: {
      userPushRows: pushRows,
    },
  };
};

export const userPullQueryBuilder: RxGraphQLReplicationPullQueryBuilder<
  number
> = (latestPulledCheckpoint, limit) => {
  const query = /* GraphQL */ `
    query PullQuery($checkpoint: PullCheckpointInput!, $limit: Int!) {
      pullUsers(checkpoint: $checkpoint, limit: $limit) {
        documents {
          ...UserFields
        }
        checkpoint {
          id
          updatedAt
        }
      }
    }
    ${USER_FIELDS_FRAGMENT}
  `;
  return {
    query,
    variables: {
      limit: limit,
      checkpoint: latestPulledCheckpoint || { id: "", updatedAt: 0 },
    },
  };
};
