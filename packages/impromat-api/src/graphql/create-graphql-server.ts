import { useDisableIntrospection } from "@envelop/disable-introspection";
import { loadFiles } from "@graphql-tools/load-files";
import { createServer, YogaInitialContext } from "@graphql-yoga/node";
import { SafeIntDefinition } from "graphql-scalars";
import { Database } from "../database/database";
import { ServerContext, UserContext } from "./graphql-context";
import { resolvers } from "./resolvers";

const typeDefs = await loadFiles("schema/**/*.graphql");

export type ContextFn = (
  ctx: YogaInitialContext & ServerContext
) => Promise<UserContext>;

export interface GraphQLServerConfiguration {
  database: Database;
  isProduction: boolean;
}

export async function createGraphQLServer({
  database,
  isProduction,
}: GraphQLServerConfiguration) {
  console.log("IsProduction", isProduction);
  const graphQLServer = createServer<ServerContext, UserContext>({
    context: async (ctx) => ({
      session: ctx.req.session?.data,
      database,
    }),
    graphiql: isProduction ? undefined : { title: "Impromat API" },
    schema: {
      typeDefs: [SafeIntDefinition, ...typeDefs],
      resolvers,
    },
    maskedErrors: isProduction,
    plugins: [isProduction ? useDisableIntrospection() : () => {}],
  });
  return graphQLServer;
}
