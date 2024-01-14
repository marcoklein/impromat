import { graphql } from "../../graphql-client";

export const UpdateElementMutation = graphql(`
  mutation UpdateElementMutation($input: UpdateElementInput!) {
    updateElement(input: $input) {
      id
    }
  }
`);
