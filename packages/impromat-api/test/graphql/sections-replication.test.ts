import { expect } from "chai";
import { gql } from "graphql-request";
import { describe } from "mocha";
import { MutationPushSectionsArgs } from "../../src/graphql/schema.gen";
import { createGraphQLTestContext } from "./graphql-test-utils";

const QUERY_FIELDS_FRAGMENT = gql`
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

const PUSH_MUTATION = gql`
  mutation PushMutation($sectionPushRows: [SectionPushRowInput!]!) {
    pushSections(sectionPushRows: $sectionPushRows) {
      ...QueryFields
    }
  }
  ${QUERY_FIELDS_FRAGMENT}
`;

const PULL_QUERY = gql`
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

describe("Sections Replication", async () => {
  let testContext: Awaited<ReturnType<typeof createGraphQLTestContext>>;
  const userId = "test-user-id";

  before(async () => {
    testContext = await createGraphQLTestContext();
    testContext.changeUser(userId);
  });

  it("should return an empty sections list", async () => {
    // given
    const args = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 1,
    };
    // when
    const data = await testContext.client.request(PULL_QUERY, args);
    // then
    const checkpoint = data.pullSections.checkpoint;
    const documents = data.pullSections.documents;
    expect(checkpoint.id).to.equal("");
    expect(checkpoint.updatedAt).to.equal(0);
    expect(documents).to.be.empty;
  });

  it("should push a new section", async () => {
    // given
    const args: MutationPushSectionsArgs = {
      sectionPushRows: [
        {
          assumedMasterState: undefined,
          newDocumentState: {
            id: "test",
            version: 0,
            name: "section name",
          },
        },
      ],
    };
    // when
    const conflicts = await testContext.client.request(PUSH_MUTATION, args);
    // then
    expect(conflicts.pushSections).to.be.empty;
  });

  it("should return the new section", async () => {
    // given
    const args = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 1,
    };
    // when
    const data = await testContext.client.request(PULL_QUERY, args);
    // then
    const checkpoint = data.pullSections.checkpoint;
    const documents = data.pullSections.documents;
    expect(documents).to.have.lengthOf(1);
    expect(checkpoint.id).to.equal("test");
    expect(checkpoint.updatedAt + 1000).to.be.greaterThan(Date.now());
  });

  after(() => {
    testContext.cleanup();
  });
});
