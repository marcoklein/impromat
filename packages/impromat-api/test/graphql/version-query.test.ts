import { expect } from "chai";
import { gql } from "graphql-request";
import fs from "node:fs";
import { createGraphQLTestContext } from "./graphql-test-utils";

const version = JSON.parse(
  fs.readFileSync("./package.json").toString()
).version;

describe("GraphQL Server", async () => {
  const { client, server, cleanup } = await createGraphQLTestContext();

  it("should return the current app version", async () => {
    // given
    const query = gql`
      {
        version
      }
    `;
    // when
    const data = await client.request(query);
    // then
    expect(data.version).to.equal(version);
  });

  after(() => {
    cleanup();
  });
});
