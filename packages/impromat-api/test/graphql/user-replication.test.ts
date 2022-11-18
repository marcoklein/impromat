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
  describe("Default Retrieval", async () => {
    let testContext: Awaited<ReturnType<typeof createGraphQLTestContext>>;

    before(async () => {
      testContext = await createGraphQLTestContext();
    });

    it("should return default user info", async () => {
      // given
      const userId = "test-user-id";
      testContext.changeUser(userId);
      const query = PULL_USER_QUERY;
      // when
      const data = await testContext.client.request(query);
      // then
      expect(data.me.userId).to.equal(userId);
      expect(data.me.user.id).to.equal(userId);
      expect(data.me.user.favoriteElements).to.deep.equal([]);
    });

    it("should return favorite element", async () => {
      // given
      const userId = "test-user-id";
      const favoriteElementId = "element-id";
      testContext.changeUser(userId);
      const query = PULL_USER_QUERY;
      const workshop = TEST_DATA.simpleWorkshop();
      testContext.database.addWorkshop(userId, workshop);
      testContext.database.setUser(userId, {
        version: 0,
        updatedAt: 0,
        favoriteElementIds: [favoriteElementId],
      });
      // when
      const data = await testContext.client.request(query);
      // then
      expect(data.me.userId).to.equal(userId);
      expect(data.me.user.id).to.equal(userId);
      expect(data.me.user.favoriteElements).to.have.lengthOf(1);
      expect(data.me.user.favoriteElements[0].id).to.equal(favoriteElementId);
      expect(data.me.user.favoriteElements[0].name).to.equal("test element");
    });

    after(() => {
      testContext.cleanup();
    });
  });

  describe("Push User Changes", async () => {
    let testContext: Awaited<ReturnType<typeof createGraphQLTestContext>>;
    const userId = "test-user-id";

    before(async () => {
      testContext = await createGraphQLTestContext();
      const workshop = TEST_DATA.simpleWorkshop();
      testContext.database.addWorkshop(userId, workshop);
      testContext.changeUser(userId);
    });

    it("should set favorite element", async () => {
      // given
      const query = PUSH_USER_MUTATION;
      const userPushRowInput: UserPushRowInput = {
        assumedMasterState: {
          version: 0,
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
      expect(data.me.user.version).to.equal(1);
      expect(data.me.user.favoriteElements).to.have.lengthOf(2);
      expect(data.me.user.favoriteElements[0].id).to.equal("element-id");
      expect(data.me.user.favoriteElements[0].name).to.equal("test element");
      expect(data.me.user.favoriteElements[1].id).to.equal("second-element-id");
      expect(data.me.user.favoriteElements[1].name).to.equal(
        "second test element"
      );
    });

    it("should return a conflict", async () => {
      // given
      const query = PUSH_USER_MUTATION;
      const userPushRowInput: UserPushRowInput = {
        assumedMasterState: {
          version: 0,
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
      expect(data.pushUser.version).to.equal(1);
      expect(data.pushUser.favoriteElements).to.have.lengthOf(2);
    });

    after(() => {
      testContext.cleanup();
    });
  });
});
