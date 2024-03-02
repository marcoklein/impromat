import {
  AnyVariables,
  CombinedError,
  Operation,
  errorExchange,
  fetchExchange,
} from "urql";
import { environment } from "./environment";

import { devtoolsExchange } from "@urql/devtools";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import { retryExchange } from "@urql/exchange-retry";
import { createClient as createUrqlClient } from "urql";
import { APP_LOCAL_STORAGE_PREFIX } from "./app-local-storage-prefix";
import { clearLocalStorageWithPrefix } from "./functions/clear-local-storage";

export function createCachedGraphqlClient(
  onError: (
    error: CombinedError,
    operation: Operation<any, AnyVariables>,
  ) => void,
) {
  return createUrqlClient({
    url: `${environment.API_URL}/graphql`,
    fetchOptions: { credentials: "include" },
    exchanges: [
      devtoolsExchange,
      cacheExchange({
        keys: {
          ElementSearchMatch: () => null,
          ElementSearchResult: () => null, // do not cache search results
          ElementTag: () => null, // do not cache tags separately
        },
        resolvers: {
          Query: {
            searchElements: simplePagination({
              limitArgument: "take",
              offsetArgument: "skip",
            }),
            searchElementsTfidf: simplePagination({
              limitArgument: "take",
              offsetArgument: "skip",
            }),
          },
        },
        updates: {
          Mutation: {
            logout(_result, _args, cache, _info) {
              clearLocalStorageWithPrefix(APP_LOCAL_STORAGE_PREFIX);
              cache.invalidate("Query");
            },
            createElement(_result, _args, cache, _info) {
              cache.invalidate("Query", "elements");
              invalidateMeUser(cache, "elements");
            },
            updateUser(_result, _args, cache, _info) {
              invalidateMeUser(cache);
            },
            updateElement(result, _args, cache, _info) {
              const id = (result.updateElement as any)?.id;
              cache.invalidate({
                __typename: "Element",
                id,
              });
            },
            createWorkshop(_result, _args, cache, _info) {
              cache.invalidate("Query", "workshops");
              invalidateMeUser(cache, "workshops");
            },
            updateWorkshop(_result, _args, cache, _info) {
              const id = (_result.updateWorkshop as any)?.id;
              cache.invalidate({
                __typename: "Workshop",
                id,
              });
            },
            duplicateWorkshop(_result, _args, cache, _info) {
              invalidateMeUser(cache, "workshops");
            },
            deleteWorkshop(_result, _args, cache, _info) {
              const id = (_result.deleteWorkshop as any)?.id;
              cache.invalidate({ __typename: "Workshop", id });
            },
            updateWorkshopItemOrder(_result, _args, cache, _info) {
              const id = (_result.updateWorkshopItemOrder as any)?.id;
              cache.invalidate({
                __typename: "Workshop",
                id,
              });
            },
          },
        },
      }),
      errorExchange({
        onError(error, operation) {
          console.error("GraphQL Error:", error);
          onError(error, operation);
        },
      }),
      retryExchange({
        initialDelayMs: 1000,
        maxDelayMs: 15000,
        maxNumberAttempts: 2,
        randomDelay: false,
        retryIf: (err: any) => !!(err && err.networkError),
      }) as any,
      fetchExchange,
    ],
  });
}

/**
 * Helper function to read the user id of the currently cached logged in user id.
 *
 * @param cache Graphcache to retrieve id from.
 * @returns Response of the me query that returns the logged in user id.
 */
function getMeUserIdFromCache(cache: Cache) {
  const meResult = cache.resolve({ __typename: "Query" }, "me");
  if (typeof meResult === "string") {
    const meId = cache.resolve(meResult, "id");
    if (typeof meId === "string") {
      return meId;
    }
  }
  return undefined;
}

/**
 * Invalidates fields of the me user (currently active user).
 *
 * @param cache Graphcache to use.
 * @param userFieldName Optional user id field to invalidate.
 */
function invalidateMeUser(cache: Cache, userFieldName?: string) {
  const myUserId = getMeUserIdFromCache(cache);
  if (myUserId) {
    if (userFieldName) {
      const entity = cache.keyOfEntity({ __typename: "User", id: myUserId });
      cache
        .inspectFields(entity)
        .filter((field) => field.fieldName === userFieldName)
        .forEach((field) => {
          cache.invalidate(entity, field.fieldKey);
          console.log(`Cache invalidating ${entity}: ${field.fieldKey}`);
        });
    } else {
      cache.invalidate({ __typename: "User", id: myUserId });
    }
  }
}
