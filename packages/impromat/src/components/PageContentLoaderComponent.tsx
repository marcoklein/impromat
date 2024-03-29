import { Refresh } from "@mui/icons-material";
import { Button, CircularProgress, Typography } from "@mui/material";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { OperationContext, UseQueryState } from "urql";
import { useComponentLogger } from "../hooks/use-component-logger";
import { useStateChangeLogger } from "../hooks/use-state-change-logger";

interface ContainerProps extends PropsWithChildren {
  /**
   * One or multiple query results.
   */
  queryResult: UseQueryState | Array<UseQueryState>;
  /**
   * One or many reexecution functions for queries.
   */
  reexecuteQuery:
    | ((opts?: Partial<OperationContext>) => void)
    | Array<(opts?: Partial<OperationContext>) => void>;
  /**
   * If true, the refresher is not rendered.
   */
  noRefresher?: boolean;
}

/**
 * Renders a component that displays loading, error, or data based on the query result.
 *
 * @example
 * ```tsx
 * <PageContentLoaderComponent
 *   queryResult={queryResult}
 *   reexecuteQuery={reexecuteQuery}
 * >
 *   <ContentComponent />
 * </PageContentLoaderComponent>
 * ```
 *
 * @param props The component props.
 * @returns The rendered component.
 */
export const PageContentLoaderComponent: React.FC<ContainerProps> = ({
  queryResult: queryResultInput,
  reexecuteQuery,
  noRefresher,
  children,
}) => {
  const logger = useComponentLogger("PageContentLoaderComponent");
  const queryResult = useMemo(
    () =>
      Array.isArray(queryResultInput) ? queryResultInput : [queryResultInput],
    [queryResultInput],
  );
  useStateChangeLogger(queryResult, "queryResult", logger);

  const reexecuteQueries = useCallback(() => {
    if (Array.isArray(reexecuteQuery)) {
      for (const fn of reexecuteQuery) {
        fn({ requestPolicy: "network-only" });
      }
    } else {
      reexecuteQuery({ requestPolicy: "network-only" });
    }
  }, [reexecuteQuery]);

  const { allHaveData, fetching, networkError, nonNetworkError, error } =
    useMemo(() => {
      const allHaveData = queryResult.every((result) => result.data);
      const fetching = queryResult.some((result) => result.fetching);
      const stale = queryResult.some((result) => result.stale);
      const networkError = queryResult.some(
        (result) => result.error?.networkError,
      );
      const nonNetworkError = queryResult.find(
        (result) => result.error && !result.error.networkError,
      );
      const error = networkError || nonNetworkError;
      return {
        allHaveData,
        fetching,
        stale,
        networkError,
        nonNetworkError,
        error,
      };
    }, [queryResult]);

  return (
    <>
      {allHaveData ? (
        children
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {fetching && <CircularProgress />}
          {!fetching && error && (
            <>
              <div>
                {/* TODO refactor loading */}
                <div>
                  {networkError ? (
                    <Typography>Network is not reachable.</Typography>
                  ) : (
                    <Typography>
                      Unknown error: {nonNetworkError?.error?.message}
                    </Typography>
                  )}
                </div>
                <Button
                  fullWidth
                  onClick={() => reexecuteQueries()}
                  startIcon={<Refresh />}
                >
                  {/* TODO translate */}
                  Retry
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
