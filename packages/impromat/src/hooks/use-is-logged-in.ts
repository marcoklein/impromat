import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { graphql } from "../graphql-client";

const IsLoggedInQuery = graphql(`
  query IsLoggedIn {
    me {
      id
    }
  }
`);

export function useIsLoggedIn() {
  const [meQueryResult, retriggerLogInQuery] = useQuery({
    query: IsLoggedInQuery,
  });
  // TODO store login cache in context?
  const [cachedIsLoggedIn, setCachedIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "1" ? true : false,
  );

  useEffect(() => {
    if (!meQueryResult.fetching) {
      localStorage.setItem("isLoggedIn", meQueryResult.data?.me ? "1" : "0");
    }
    if (meQueryResult.error) {
      console.log("Errors: ", meQueryResult.error.graphQLErrors);
      if (
        meQueryResult.error.graphQLErrors.find(
          (e) => e.extensions.code === "FORBIDDEN",
        )
      ) {
        localStorage.setItem("isLoggedIn", "0");
        setCachedIsLoggedIn(false);
      }
    }
  }, [meQueryResult]);

  return {
    fetching: !cachedIsLoggedIn && meQueryResult.fetching,
    isLoggedIn: cachedIsLoggedIn || !!meQueryResult.data?.me,
    retriggerLogInQuery: () =>
      retriggerLogInQuery({ requestPolicy: "network-only" }),
  };
}
