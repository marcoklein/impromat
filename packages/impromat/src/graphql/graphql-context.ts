import { GraphQLClient } from "graphql-request";
import { createContext } from "react";
import { environment } from "../environment";
import { getSdk, Sdk } from "./schema.gen";

export type GraphQLContextType = {
  client: GraphQLClient;
  sdk: Sdk;
};

const client = new GraphQLClient(environment.API_URL);

export const GraphQLContext = createContext<GraphQLContextType>({
  client,
  sdk: getSdk(client),
});
