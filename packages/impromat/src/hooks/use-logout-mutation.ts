import { useMutation } from "urql";
import { graphql } from "../graphql-client";

export function useLogoutMutation() {
  return useMutation(
    graphql(`
      mutation LogoutMutation {
        logout
      }
    `),
  );
}
