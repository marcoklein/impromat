import {
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { reload } from "ionicons/icons";
import { PropsWithChildren } from "react";
import { OperationContext, UseQueryState } from "urql";

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
  queryResult,
  reexecuteQuery,
  children,
}) => {
  if (!Array.isArray(queryResult)) {
    queryResult = [queryResult];
  }
  function reexecuteQueries() {
    if (Array.isArray(reexecuteQuery)) {
      for (const fn of reexecuteQuery) {
        fn({ requestPolicy: "network-only" });
      }
    } else {
      reexecuteQuery({ requestPolicy: "network-only" });
    }
  }
  function renderRefresher() {
    return (
      <IonRefresher
        slot="fixed"
        onIonRefresh={(event) => {
          reexecuteQueries();
          setTimeout(() => {
            event.detail.complete();
          }, 500);
        }}
      >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
    );
  }

  const allHaveData = queryResult.every((result) => result.data);
  const fetching = queryResult.some((result) => result.fetching);
  const networkError = queryResult.some((result) => result.error?.networkError);
  const nonNetworkError = queryResult.find(
    (result) => !result.error?.networkError,
  );
  const error = networkError || nonNetworkError;

  if (allHaveData) {
    return (
      <>
        {renderRefresher()}
        {children}
      </>
    );
  }
  return (
    <>
      {renderRefresher()}
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
    </>
  );
};
