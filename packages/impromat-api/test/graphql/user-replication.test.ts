import { expect } from "chai";
import { gql } from "graphql-request";
import { describe } from "mocha";
import { TEST_DATA } from "../test-data-provider";
import { createGraphQLTestContext } from "./graphql-test-utils";

export const PUSH_USER_MUTATION = gql`
  mutation PushUserMutation($userRowInput: UserRowInput!) {
    pushUser(userPushRow: $userPushRowInput) {
      id
      updatedAt
      favoriteElements
    }
  }
`;

export const PULL_USER_QUERY = gql`
  {
    me {
      userId
      user {
        id
        favoriteElements {
          id
        }
      }
    }
  }
`;

describe("User Replication", async () => {
  const { client, cleanup, changeUser, database } =
    await createGraphQLTestContext();

  it("should return default user info", async () => {
    // given
    const userId = "test-user-id";
    changeUser(userId);
    const query = PULL_USER_QUERY;
    // when
    const data = await client.request(query);
    // then
    expect(data.me.userId).to.equal(userId);
    expect(data.me.user.id).to.equal(userId);
    expect(data.me.user.favoriteElements).to.deep.equal([]);
  });

  it("should return default user info", async () => {
    // given
    const userId = "test-user-id";
    const favoriteElementId = "element-id";
    changeUser(userId);
    const query = PULL_USER_QUERY;
    const workshop = TEST_DATA.simpleWorkshop();
    database.setUser(userId, {
      favoriteElementIds: [favoriteElementId],
    });
    database.addWorkshop(userId, workshop);
    // when
    const data = await client.request(query);
    // then
    expect(data.me.userId).to.equal(userId);
    expect(data.me.user.id).to.equal(userId);
    expect(data.me.user.favoriteElements).to.have.lengthOf(1);
  });

  after(() => {
    cleanup();
  });
});
