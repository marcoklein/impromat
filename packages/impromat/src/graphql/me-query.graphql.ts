import { graphql } from "../graphql-client";

// TODO move to reference
export const meQuery = graphql(`
  query Me {
    me {
      id
      version
      favoriteElements {
        element {
          id
        }
      }
    }
  }
`);
