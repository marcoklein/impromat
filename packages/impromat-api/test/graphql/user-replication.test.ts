import { expect } from "chai";
import { gql } from "graphql-request";
import { describe } from "mocha";
import { UserPushRowInput } from "../../src/graphql/schema.gen";
import { TEST_DATA } from "../test-data-provider";
import { createGraphQLTestContext } from "./graphql-test-utils";

export const PUSH_USER_MUTATION = gql`
  mutation PushUserMutation($userPushRowInput: UserPushRowInput!) {
    pushUser(userPushRow: $userPushRowInput) {
      id
      version
      favoriteElements {
        id
        name
      }
    }
  }
`;

export const PULL_USER_QUERY = gql`
  {
    me {
      userId
      user {
        id
        version
        favoriteElements {
          id
          name
        }
      }
    }
  }
`;

describe("User Replication", async () => {
  let testContext: Awaited<ReturnType<typeof createGraphQLTestContext>>;
  const userId = "test-user-id";

  before(async () => {
    testContext = await createGraphQLTestContext();
    const workshop = TEST_DATA.simpleWorkshop();
    testContext.database.addWorkshop(userId, workshop);
    testContext.changeUser(userId);
  });

  it("should return no user info", async () => {
    // given
    const userId = "test-user-id";
    testContext.changeUser(userId);
    const query = PULL_USER_QUERY;
    // when
    const data = await testContext.client.request(query);
    // then
    expect(data.me.userId).to.equal(userId);
    expect(data.me.user).to.be.null;
  });

  it("should set favorite element", async () => {
    // given
    const query = PUSH_USER_MUTATION;
    const userPushRowInput: UserPushRowInput = {
      assumedMasterState: undefined,
      newDocumentState: {
        favoriteElements: ["element-id", "second-element-id"],
        version: 0,
      },
    };
    // when
    const data = await testContext.client.request(query, {
      userPushRowInput,
    });
    // then
    expect(data.pushUser).to.be.null;
  });

  it("should return favorite elements", async () => {
    // given
    const query = PULL_USER_QUERY;
    // when
    const data = await testContext.client.request(query);
    // then
    expect(data.me.userId).to.equal(userId);
    expect(data.me.user.id).to.equal(userId);
    expect(data.me.user.version).to.equal(0);
    expect(data.me.user.favoriteElements).to.have.lengthOf(2);
    expect(data.me.user.favoriteElements[0].id).to.equal("element-id");
    expect(data.me.user.favoriteElements[0].name).to.equal("test element");
    expect(data.me.user.favoriteElements[1].id).to.equal("second-element-id");
    expect(data.me.user.favoriteElements[1].name).to.equal(
      "second test element"
    );
  });

  it("should return a conflict for version mismatch", async () => {
    // given
    const query = PUSH_USER_MUTATION;
    const userPushRowInput: UserPushRowInput = {
      assumedMasterState: {
        version: 1,
        favoriteElements: [],
      },
      newDocumentState: {
        favoriteElements: ["element-id", "second-element-id"],
        version: 1,
      },
    };
    // when
    const data = await testContext.client.request(query, {
      userPushRowInput,
    });
    // then
    expect(data.pushUser).not.to.be.null;
    expect(data.pushUser.id).to.equal(userId);
    expect(data.pushUser.version).to.equal(0);
    expect(data.pushUser.favoriteElements).to.have.lengthOf(2);
  });

  it("should return a conflict for too high version bump", async () => {
    // given
    const query = PUSH_USER_MUTATION;
    const userPushRowInput: UserPushRowInput = {
      assumedMasterState: {
        version: 0,
        favoriteElements: [],
      },
      newDocumentState: {
        favoriteElements: ["element-id", "second-element-id"],
        version: 3,
      },
    };
    // when
    const data = await testContext.client.request(query, {
      userPushRowInput,
    });
    // then
    expect(data.pushUser).not.to.be.null;
    expect(data.pushUser.id).to.equal(userId);
    expect(data.pushUser.version).to.equal(0);
    expect(data.pushUser.favoriteElements).to.have.lengthOf(2);
  });

  after(() => {
    testContext.cleanup();
  });
});
