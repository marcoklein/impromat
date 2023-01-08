import { expect } from "chai";
import { gql } from "graphql-request";
import { describe } from "mocha";
import { MutationPushElementsArgs } from "../../src/graphql/schema.gen";
import { createGraphQLTestContext } from "./graphql-test-utils";

const QUERY_FIELDS_FRAGMENT = gql`
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

const PUSH_ELEMENT_MUTATION = gql`
  mutation PushMutation($elementPushRows: [ElementPushRowInput!]!) {
    pushElements(elementPushRows: $elementPushRows) {
      ...QueryFields
    }
  }
  ${QUERY_FIELDS_FRAGMENT}
`;

const PULL_ELEMENT_QUERY = gql`
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

describe("Elements Replication", async () => {
  let testContext: Awaited<ReturnType<typeof createGraphQLTestContext>>;
  const userId = "test-user-id";

  before(async () => {
    testContext = await createGraphQLTestContext();
    testContext.changeUser(userId);
  });

  it("should return an empty elements list", async () => {
    // given
    const args = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 1,
    };
    // when
    const data = await testContext.client.request(PULL_ELEMENT_QUERY, args);
    // then
    const checkpoint = data.pullElements.checkpoint;
    const documents = data.pullElements.documents;
    expect(checkpoint.id).to.equal("");
    expect(checkpoint.updatedAt).to.equal(0);
    expect(documents).to.be.empty;
  });

  it("should push a new element", async () => {
    // given
    const args: MutationPushElementsArgs = {
      elementPushRows: [
        {
          assumedMasterState: undefined,
          newDocumentState: {
            id: "test",
            version: 0,
            name: "element name",
          },
        },
      ],
    };
    // when
    const conflicts = await testContext.client.request(
      PUSH_ELEMENT_MUTATION,
      args
    );
    // then
    expect(conflicts.pushElements).to.be.empty;
  });

  it("should push a new element that is based on the previous element", async () => {
    // given
    const args: MutationPushElementsArgs = {
      elementPushRows: [
        {
          assumedMasterState: undefined,
          newDocumentState: {
            id: "elementWithBasedOn",
            version: 0,
            name: "based on other element",
            basedOn: "test",
          },
        },
      ],
    };
    // when
    const conflicts = await testContext.client.request(
      PUSH_ELEMENT_MUTATION,
      args
    );
    // then
    expect(conflicts.pushElements).to.be.empty;
  });

  it("should return the new element", async () => {
    // given
    const args = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 10,
    };
    // when
    const data = await testContext.client.request(PULL_ELEMENT_QUERY, args);
    // then
    const checkpoint = data.pullElements.checkpoint;
    const documents = data.pullElements.documents;
    expect(documents).to.have.lengthOf(2);
    expect(documents[0].id).to.equal("test");
    expect(documents[1].id).to.equal("elementWithBasedOn");
    expect(documents[1].basedOn.id).to.equal("test");
    expect(checkpoint.id).to.equal("elementWithBasedOn");
    expect(checkpoint.updatedAt + 1000).to.be.greaterThan(Date.now());
  });

  after(() => {
    testContext.cleanup();
  });
});
