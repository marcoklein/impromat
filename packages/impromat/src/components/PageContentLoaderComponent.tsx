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
import { UseQueryState } from "urql";

interface ContainerProps extends PropsWithChildren {
  queryResult: UseQueryState;
  onRetryClick: () => void;
}

/**
 * Presents a loading spinner and shows a button for a manual retry if there is a network error.
 *
 * @returns
 */
export const PageContentLoaderComponent: React.FC<ContainerProps> = ({
  queryResult,
  onRetryClick,
  children,
}) => {
  function renderRefresher() {
    return (
      <IonRefresher
        slot="fixed"
        onIonRefresh={(event) => {
          onRetryClick();
          setTimeout(() => {
            event.detail.complete();
          }, 500);
        }}
      >
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
    );
  }
  if (queryResult.data) {
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
        {queryResult.fetching && <IonSpinner></IonSpinner>}
        {!queryResult.fetching && queryResult.error && (
          <>
            <div>
              <div>
                {queryResult.error.networkError ? (
                  <IonText>Network is not reachable.</IonText>
                ) : (
                  <IonText>Unknown error: {queryResult.error.message}</IonText>
                )}
              </div>
              <IonButton expand="full" onClick={() => onRetryClick()}>
                <IonIcon icon={reload} slot="start"></IonIcon> Retry
              </IonButton>
            </div>
          </>
        )}
      </div>
    </>
  );
};
