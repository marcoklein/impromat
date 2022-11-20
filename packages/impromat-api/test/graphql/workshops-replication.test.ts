import "mocha";
import { expect } from "chai";
import { MutationPushWorkshopsArgs } from "../../src/graphql/schema.gen";
import { createGraphQLTestContext } from "./graphql-test-utils";
import {
  PULL_WORKSHOPS_QUERY,
  PUSH_WORKSHOPS_MUTATION,
} from "./shared-queries";

describe("Workshop Replication", async () => {
  const { client, cleanup } = await createGraphQLTestContext();

  let updatedAtForInsertion = 0;

  it("should return an empty workshop list", async () => {
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
    expect(checkpoint.id).to.equal("");
    expect(checkpoint.updatedAt).to.equal(0);
    expect(documents).to.be.empty;
  });

  it("should add a new workshop", async () => {
    // given
    const args: MutationPushWorkshopsArgs = {
      workshopPushRows: [
        {
          newDocumentState: {
            id: "1",
            version: 0,
            deleted: false,
            name: "Test",
            description: "Test",
            sectionRefs: [],
          },
        },
      ],
    };
    // when
    const conflicts = await client.request(PUSH_WORKSHOPS_MUTATION, args);
    // then
    expect(conflicts.pushWorkshops).to.be.empty;
  });

  it("should return the new workshop", async () => {
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
    expect(checkpoint.id).to.equal("1");
    expect(checkpoint.updatedAt + 1000).to.be.greaterThan(Date.now());
    updatedAtForInsertion = checkpoint.updatedAt;
    expect(documents).to.have.lengthOf(1);
    expect(documents[0].id).to.equal("1");
  });

  it("should update the workshop", async () => {
    // given
    const args: MutationPushWorkshopsArgs = {
      workshopPushRows: [
        {
          assumedMasterState: {
            version: 0,
            id: "1",
          },
          newDocumentState: {
            id: "1",
            version: 1,
            deleted: false,
            name: "TestUpdate",
            description: "Test",
            sectionRefs: [],
          },
        },
      ],
    };
    // when
    const conflicts = await client.request(PUSH_WORKSHOPS_MUTATION, args);
    // then
    expect(conflicts.pushWorkshops).to.be.empty;
  });

  it("should return the updated workshop", async () => {
    // given
    const args = {
      checkpoint: { id: "1", updatedAt: 10 },
      limit: 1,
    };
    // when
    const data = await client.request(PULL_WORKSHOPS_QUERY, args);
    // then
    const checkpoint = data.pullWorkshops.checkpoint;
    const documents = data.pullWorkshops.documents;
    expect(checkpoint.id).to.equal("1");
    expect(checkpoint.updatedAt + 1000).to.be.greaterThan(Date.now());
    expect(documents).to.have.lengthOf(1);
    expect(documents[0].id).to.equal("1");
  });

  it("should update the workshop with assumed master state", async () => {
    // given
    const args: MutationPushWorkshopsArgs = {
      workshopPushRows: [
        {
          assumedMasterState: {
            id: "1",
            version: 1,
            deleted: false,
            name: "TestUpdate",
            description: "Test",
            sectionRefs: [],
          },
          newDocumentState: {
            id: "1",
            version: 2,
            deleted: false,
            name: "MasterTestUpdate",
            description: "Test",
            sectionRefs: [],
          },
        },
      ],
    };
    // when
    const conflicts = await client.request(PUSH_WORKSHOPS_MUTATION, args);
    // then
    expect(conflicts.pushWorkshops).to.be.empty;
  });

  after(() => {
    cleanup();
  });
});
