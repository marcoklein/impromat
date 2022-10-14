import { expect } from "chai";
import { Workshop } from "../../src/graphql/schema.gen";
import { createGraphQLTestContext } from "./graphql-test-utils";
import {
  PULL_WORKSHOPS_QUERY,
  PUSH_WORKSHOPS_MUTATION,
} from "./shared-queries";

describe("Workshop Sharing Accross Users", async () => {
  const { client, cleanup, changeUser } = await createGraphQLTestContext();

  const updatedAtForInsertion = Date.now() + 10;
  const pushedWorkshop: Workshop = {
    id: "1",
    updatedAt: updatedAtForInsertion,
    deleted: false,
    name: "Test",
    description: "Test",
    sections: [],
  };

  it("should add a new workshop for user a", async () => {
    // given
    changeUser("a");
    const args = {
      workshopPushRows: [
        {
          newDocumentState: { ...pushedWorkshop },
        },
      ],
    };
    // when
    const conflicts = await client.request(PUSH_WORKSHOPS_MUTATION, args);
    // then
    expect(conflicts.pushWorkshops).to.be.empty;
  });

  it("should return workshop to user a", async () => {
    // given
    const args = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 1,
    };
    // when
    const data = await client.request(PULL_WORKSHOPS_QUERY, args);
    // then
    const checkpoint = data.pullWorkshops.checkpoint;
    const documents = data.pullWorkshops.documents;
    expect(documents).to.deep.equal([pushedWorkshop]);
    expect(checkpoint.id).to.equal("1");
    expect(checkpoint.updatedAt).to.equal(updatedAtForInsertion);
  });

  it("should not return workshops to user b", async () => {
    // given
    changeUser("b");
    const args = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 1,
    };
    // when
    const data = await client.request(PULL_WORKSHOPS_QUERY, args);
    // then
    const checkpoint = data.pullWorkshops.checkpoint;
    const documents = data.pullWorkshops.documents;
    expect(checkpoint.id).to.equal("");
    expect(checkpoint.updatedAt).to.equal(0);
    expect(documents).to.be.empty;
  });

  after(() => {
    cleanup();
  });
});
