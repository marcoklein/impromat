import { IonButton, IonIcon, IonSpinner, IonText } from "@ionic/react";
import { reload } from "ionicons/icons";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { OperationContext, UseQueryState } from "urql";
import { Refresher } from "./Refresher";

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
}

/**
 * Presents a loading spinner and shows a button for a manual retry if there is a network error.
 *
 * @returns
 */
export const PageContentLoaderComponent: React.FC<ContainerProps> = ({
  queryResult: queryResultInput,
  reexecuteQuery,
  children,
}) => {
  const queryResult = useMemo(
    () =>
      Array.isArray(queryResultInput) ? queryResultInput : [queryResultInput],
    [queryResultInput],
  );

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
      const networkError = queryResult.some(
        (result) => result.error?.networkError,
      );
      const nonNetworkError = queryResult.find(
        (result) => !result.error?.networkError,
      );
      const error = networkError || nonNetworkError;
      return { allHaveData, fetching, networkError, nonNetworkError, error };
    }, [queryResult]);

  return (
    <>
      <Refresher onRefresh={reexecuteQueries}></Refresher>
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
          {fetching && <IonSpinner></IonSpinner>}
          {!fetching && error && (
            <>
              <div>
                <div>
                  {networkError ? (
                    <IonText>Network is not reachable.</IonText>
                  ) : (
                    <IonText>
                      Unknown error: {nonNetworkError?.error?.message}
                    </IonText>
                  )}
                </div>
                <IonButton expand="full" onClick={() => reexecuteQueries()}>
                  <IonIcon icon={reload} slot="start"></IonIcon> Retry
                </IonButton>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
