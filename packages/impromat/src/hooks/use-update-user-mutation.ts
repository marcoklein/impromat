import { graphql } from "../graphql-client";
import { useMutation } from "urql";

export function useUpdateUserMutation() {
  return useMutation(
    graphql(`
      mutation UpdateUserMutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
          id
          name
          languageCodes

          createdAt
          updatedAt
          version
          deleted
        }
      }
    `),
  );
}
