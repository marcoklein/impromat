import { expect } from "chai";
import { ClientError } from "graphql-request";
import { createGraphQLTestContext } from "./graphql-test-utils";

describe("Production GraphQL", async () => {
  const { client, cleanup } = await createGraphQLTestContext({
    isProduction: true,
  });

  it("should not allow introspection", async () => {
    // given
    const query = /* GraphQL */ `
      {
        __schema {
          types {
            name
          }
        }
      }
    `;
    // when
    try {
      await client.request(query);
      expect.fail("Introspection query should fail");
    } catch (e) {
      if (e instanceof ClientError) {
        // then
        expect(e.response.data).to.be.null;
        expect(e.response.errors![0].message).to.include(
          "introspection has been disabled"
        );
      } else {
        throw e;
      }
    }
  });

  after(() => {
    cleanup();
  });
});
