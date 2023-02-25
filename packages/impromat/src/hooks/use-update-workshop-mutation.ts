import { useMutation } from "urql";
import { graphql } from "../graphql-client";

export function useUpdateWorkshopMutation() {
  return useMutation(
    graphql(`
      mutation UpdateWorkshopMutation($input: UpdateWorkshopInput!) {
        updateWorkshop(input: $input) {
          id
        }
      }
    `),
  );
}
