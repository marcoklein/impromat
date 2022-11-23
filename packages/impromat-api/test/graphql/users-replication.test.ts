import { expect } from "chai";
import { gql } from "graphql-request";
import { describe } from "mocha";
import {
  MutationPushUsersArgs,
  PullCheckpoint,
  PullCheckpointInput,
  QueryPullUsersArgs,
} from "../../src/graphql/schema.gen";
import { TEST_DATA } from "../test-data-provider";
import { createGraphQLTestContext } from "./graphql-test-utils";

export const PUSH_USERS_MUTATION = gql`
  mutation PushUsersMutation($userPushRows: [UserPushRowInput!]!) {
    pushUsers(userPushRows: $userPushRows) {
      id
      version
      favoriteElements {
        id
      }
    }
  }
`;

export const PULL_USERS_QUERY = gql`
  query PullUsers($checkpoint: PullCheckpointInput!, $limit: Int!) {
    pullUsers(checkpoint: $checkpoint, limit: $limit) {
      documents {
        id
        version
        favoriteElements {
          id
        }
      }
      checkpoint {
        id
        updatedAt
      }
    }
  }
`;

describe("Users Replication", async () => {
  let testContext: Awaited<ReturnType<typeof createGraphQLTestContext>>;
  const userId = "test-user-id";

  before(async () => {
    testContext = await createGraphQLTestContext();
    const workshop = TEST_DATA.simpleWorkshop();
    testContext.database.addWorkshop(userId, workshop);
    testContext.changeUser(userId);
  });

  it("should return an empty user list", async () => {
    // given
    const args: QueryPullUsersArgs = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 1,
    };
    // when
    const data = await testContext.client.request(PULL_USERS_QUERY, args);
    // then
    const checkpoint = data.pullUsers.checkpoint;
    const documents = data.pullUsers.documents;
    expect(checkpoint.id).to.equal(userId);
    expect(checkpoint.updatedAt).to.equal(0);
    expect(documents).to.be.empty;
  });

  it("should push a new user", async () => {
    // given
    const args: MutationPushUsersArgs = {
      userPushRows: [
        {
          assumedMasterState: undefined,
          newDocumentState: {
            version: 0,
            favoriteElementRefs: ["element-id"],
          },
        },
      ],
    };
    // when
    const conflicts = await testContext.client.request(
      PUSH_USERS_MUTATION,
      args
    );
    // then
    expect(conflicts.pushUsers).to.be.empty;
  });

  it("should return the pushed user", async () => {
    // given
    const args: QueryPullUsersArgs = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 1,
    };
    // when
    const data = await testContext.client.request(PULL_USERS_QUERY, args);
    // then
    const checkpoint = data.pullUsers.checkpoint;
    const documents = data.pullUsers.documents;
    expect(checkpoint.id).to.equal(userId);
    expect(checkpoint.updatedAt + 1000).to.be.greaterThan(Date.now());
    expect(documents).to.have.lengthOf(1);
    expect(documents[0].id).to.equal(userId);
    expect(documents[0].version).to.equal(0);
    expect(documents[0].favoriteElements).to.deep.equal([{ id: "element-id" }]);
  });

  it("should return a conflict for missing assumed master state", async () => {
    // given
    const args: MutationPushUsersArgs = {
      userPushRows: [
        {
          assumedMasterState: undefined,
          newDocumentState: {
            version: 0,
            favoriteElementRefs: ["element-id"],
          },
        },
      ],
    };
    // when
    const conflicts = await testContext.client.request(
      PUSH_USERS_MUTATION,
      args
    );
    // then
    expect(conflicts.pushUsers).to.have.lengthOf(1);
    expect(conflicts.pushUsers[0].id).to.equal(userId);
  });

  it("should return error for multiple updates", async () => {
    // given
    const args: MutationPushUsersArgs = {
      userPushRows: [
        {
          assumedMasterState: undefined,
          newDocumentState: {
            version: 0,
            favoriteElementRefs: ["element-id"],
          },
        },
        {
          assumedMasterState: undefined,
          newDocumentState: {
            version: 0,
            favoriteElementRefs: ["element-id"],
          },
        },
      ],
    };
    // when
    let errorFlag = false;
    try {
      await testContext.client.request(PUSH_USERS_MUTATION, args);
    } catch {
      errorFlag = true;
    }
    // then
    expect(errorFlag).to.be.true;
  });

  it("should return empty list if no documents are provided", async () => {
    // given
    const args: MutationPushUsersArgs = {
      userPushRows: [],
    };
    // when
    const conflicts = await testContext.client.request(
      PUSH_USERS_MUTATION,
      args
    );
    // then
    expect(conflicts.pushUsers).to.be.empty;
  });

  after(() => {
    testContext.cleanup();
  });
});
