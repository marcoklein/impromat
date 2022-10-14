import {
  RxGraphQLReplicationPullQueryBuilder,
  RxGraphQLReplicationPushQueryBuilder,
} from "rxdb";

// TODO generate this query from the generated schema
// it is fatal if one field is not synced because that yield unpredictable behavior!
// (e.g. if the isVisible attribute is not synced then suddenly sections on other devices disappear)
export const WORKSHOP_FIELDS_FRAGMENT = /* GraphQL */ `
  fragment WorkshopFields on Workshop {
    id
    updatedAt
    deleted
    name
    description
    sections {
      id
      name
      color
      isVisible
      isCollapsed
      note
      elements {
        id
        name
        markdown
        tags
        note
        languageCode
        sourceUrl
        sourceName
        sourceBaseUrl
        licenseName
        licenseUrl
        basedOn {
          id
          name
          markdown
          tags
          note
          languageCode
          sourceUrl
          sourceName
          sourceBaseUrl
          licenseName
          licenseUrl
        }
      }
    }
  }
`;

export const pushQueryBuilder: RxGraphQLReplicationPushQueryBuilder = (
  pushRows,
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

export const pullQueryBuilder: RxGraphQLReplicationPullQueryBuilder<number> = (
  latestPulledCheckpoint,
  limit,
) => {
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
      checkpoint: latestPulledCheckpoint || { id: "", updatedAt: 0 },
    },
  };
};
