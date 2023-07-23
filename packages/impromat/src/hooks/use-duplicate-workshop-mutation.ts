import { useMutation } from "urql";
import { graphql } from "../graphql-client";

export function useDuplicateWorkshopMutation() {
  return useMutation(
    graphql(`
      mutation DuplicateWorkshopMutation($input: DuplicateWorkshopInput!) {
        duplicateWorkshop(input: $input) {
          id
        }
      }
    `),
  );
}
