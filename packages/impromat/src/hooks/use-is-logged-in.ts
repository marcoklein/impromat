import { useEffect } from "react";
import { useQuery } from "urql";
import { APP_LOCAL_STORAGE_PREFIX } from "../app-local-storage-prefix";
import { graphql } from "../graphql-client";
import { useLogger } from "./use-logger";
import { usePersistedState } from "./use-persisted-state";

const IsLoggedIn_Query = graphql(`
  query IsLoggedIn_Query {
    me {
      id
    }
  }
`);

export function useIsLoggedIn() {
  const [meQueryResult, retriggerLogInQuery] = useQuery({
    query: IsLoggedIn_Query,
  });
  const [cachedIsLoggedIn, setCachedIsLoggedIn] = usePersistedState(
    "isLoggedIn",
    false,
  );
  const logger = useLogger("useIsLoggedIn");

  useEffect(() => {
    // on logout the local resolver clears all storage keys
    // so we need to check if the key is still there if a new query result is available
    const storedValue =
      localStorage.getItem(APP_LOCAL_STORAGE_PREFIX + "isLoggedIn") ?? false;
    if (storedValue !== cachedIsLoggedIn) {
      logger(
        "cachedIsLoggedIn=%s: localStorage value changed to %s",
        cachedIsLoggedIn,
        storedValue,
      );
      setCachedIsLoggedIn(storedValue === "true");
    }
  }, [cachedIsLoggedIn, logger, meQueryResult, setCachedIsLoggedIn]);

  useEffect(() => {
    if (!meQueryResult.fetching) {
      setCachedIsLoggedIn(!!meQueryResult.data?.me);
    }
    if (meQueryResult.error) {
      logger(
        "User is not logged in. Error: %j",
        meQueryResult.error.graphQLErrors,
      );
      if (
        meQueryResult.error.graphQLErrors.find(
          (e) => e.extensions.code === "FORBIDDEN",
        )
      ) {
        setCachedIsLoggedIn(false);
      }
    }
  }, [logger, meQueryResult, setCachedIsLoggedIn]);

  return {
    fetching: !cachedIsLoggedIn && meQueryResult.fetching,
    isLoggedIn: cachedIsLoggedIn || !!meQueryResult.data?.me,
    retriggerLogInQuery: () =>
      retriggerLogInQuery({ requestPolicy: "network-only" }),
    myUserId: meQueryResult.data?.me?.id,
  };
}
