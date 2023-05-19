import { useMutation } from "urql";
import { graphql } from "../graphql-client";

const UpdateUserLikedWorkshopMutation = graphql(`
  mutation UpdateUserLikedWorkshopMutation(
    $input: UpdateUserLikedWorkshopInput!
  ) {
    updateUserLikedWorkshop(input: $input) {
      id
      isLiked
    }
  }
`);

export function useUpdateUserLikedWorkshopMutation() {
  return useMutation(UpdateUserLikedWorkshopMutation);
}
