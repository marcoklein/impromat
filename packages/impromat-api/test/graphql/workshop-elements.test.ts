import "mocha";
import { expect } from "chai";
import { MutationPushWorkshopsArgs, Query } from "../../src/graphql/schema.gen";
import { createGraphQLTestContext } from "./graphql-test-utils";
import {
  PULL_WORKSHOPS_QUERY,
  PUSH_WORKSHOPS_MUTATION,
} from "./shared-queries";

xdescribe("Workshop Replication", async () => {
  const { client, cleanup } = await createGraphQLTestContext();

  it("should add a workshop with an element and section", async () => {
    // given
    const args: MutationPushWorkshopsArgs = {
      workshopPushRows: [
        {
          newDocumentState: {
            id: "1",
            updatedAt: 0,
            deleted: false,
            name: "Test",
            description: "Test",
            sections: [
              {
                id: "section1",
                name: "First Section",
                version: 0,
                elements: [
                  {
                    version: 0,
                    id: "element1",
                    name: "First Element",
                    markdown: "Markdown",
                    tags: [],
                    note: "Note",
                  },
                ],
              },
            ],
          },
        },
      ],
    };
    // when
    const conflicts = await client.request(PUSH_WORKSHOPS_MUTATION, args);
    // then
    expect(conflicts.pushWorkshops).to.be.empty;
  });

  it("should query workshop with elements and section", async () => {
    // given
    const args = {
      checkpoint: { id: "", updatedAt: 0 },
      limit: 1,
    };
    // when
    const data: Pick<Query, "pullWorkshops"> = await client.request(
      PULL_WORKSHOPS_QUERY,
      args
    );
    // then
    const checkpoint = data.pullWorkshops.checkpoint;
    const documents = data.pullWorkshops.documents;
    expect(checkpoint!.id).to.equal("1");
    expect(documents).to.have.lengthOf(1);
    const firstDoc = documents[0];
    expect(firstDoc.id).to.equal("1");
    const sections = firstDoc.sections;
    expect(sections).to.have.lengthOf(1);
    expect(sections[0].id).to.equal("section1");
    expect(sections[0].name).to.equal("First Section");
    expect(sections[0].elements).to.have.lengthOf(1);
    expect(sections[0].elements[0].id).to.equal("element1");
    expect(sections[0].elements[0].name).to.equal("First Element");
  });

  after(() => {
    cleanup();
  });
});
