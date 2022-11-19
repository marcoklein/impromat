import { useContext } from "react";
import { GraphQLContext } from "./graphql-context";

export function useApi() {
  const { sdk } = useContext(GraphQLContext);
  return sdk;
}
