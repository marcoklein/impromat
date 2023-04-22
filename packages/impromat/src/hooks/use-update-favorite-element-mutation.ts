import { useMutation } from "urql";
import { graphql } from "../graphql-client";

const UpdateUserFavoriteElementMutation = graphql(`
  mutation UpdateUserFavoriteElement($input: UpdateUserFavoriteElementInput!) {
    updateUserFavoriteElement(input: $input) {
      id
      isFavorite
    }
  }
`);

export function useUpdateUserFavoriteElementMutation() {
  return useMutation(UpdateUserFavoriteElementMutation);
}
