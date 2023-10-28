import { useMutation } from "urql";
import { graphql } from "../graphql-client";

export function useCreateWorkshopMutation() {
  return useMutation(
    graphql(`
      mutation CreateWorkshopMutation($input: CreateWorkshopInput!) {
        createWorkshop(input: $input) {
          id
        }
      }
    `),
  );
}
