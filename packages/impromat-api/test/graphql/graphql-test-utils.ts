import express from "express";
import { GraphQLClient } from "graphql-request";
import { createServer, Server } from "node:http";
import { MemoryDatabase } from "../../src/database/memory-database";
import {
  createGraphQLServer,
  GraphQLServerConfiguration,
} from "../../src/graphql/create-graphql-server";

let lastPort = 5012;
let maxPort = 5100;

/**
 * Create new testing context for GraphQL.
 *
 * @returns GraphQL client and server to run tests with.
 */
export async function createGraphQLTestContext(
  inputOptions?: Partial<GraphQLServerConfiguration>
) {
  let currentUserId = "test-session-id";
  const changeUser = (userId: string) => {
    currentUserId = userId;
  };
  const database = new MemoryDatabase();

  const defaultOptions: GraphQLServerConfiguration = {
    isProduction: false,
    database,
  };
  const options = Object.assign({}, defaultOptions, inputOptions);

  const app = express();

  // mock session plugin
  app.use((req, _res, next) => {
    (req.session as any) = {
      data: {
        userId: currentUserId,
      },
    };
    next();
  });
  app.use("/graphql", await createGraphQLServer(options));

  async function createServerOnOpenPort(): Promise<{
    port: Number;
    server: Server;
  }> {
    lastPort++;
    const server = createServer(app);
    try {
      let errorListener: any;
      await new Promise<void>((resolve, reject) => {
        server.once("error", (err) => {
          reject(err);
        });
        server.listen(lastPort, () => resolve());
      });
      if (errorListener) {
        server.removeListener("error", errorListener);
      }
      return { port: lastPort, server };
    } catch (e: any) {
      if (e.code === "EADDRINUSE") {
        console.log(`Port ${lastPort} blocked. Trying next port.`);
        lastPort++;
        if (lastPort >= maxPort) {
          throw new Error(
            `Could not find open port. Current port = ${lastPort}`
          );
        }
        return createServerOnOpenPort();
      }
      throw e;
    }
  }

  const { port, server } = await createServerOnOpenPort();

  const client = new GraphQLClient(`http://localhost:${port}/graphql`);

  const cleanup = () => {
    server.close();
  };

  return { port, client, server, cleanup, changeUser, database };
}
