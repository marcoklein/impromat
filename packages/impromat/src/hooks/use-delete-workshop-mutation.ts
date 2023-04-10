import { useMutation } from "urql";
import { graphql } from "../graphql-client";

export const useDeleteWorkshopMutation = () =>
  useMutation(
    graphql(`
      mutation DeleteWorkshopMutation($id: ID!) {
        deleteWorkshop(id: $id) {
          id
        }
      }
    `),
  );
