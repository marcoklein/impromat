import { IonButton, useIonLoading, useIonToast } from "@ionic/react";
import { environment } from "../../../environment";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useImpromatRxDb } from "../../../hooks/use-impromat-rx-db";

interface ContainerProps {}

const backendUrl = `${environment.API_URL}/graphql`;
export const AccountSignedInComponent: React.FC<ContainerProps> = () => {
  const [displayToast] = useIonToast();
  const logger = useComponentLogger("AccountSignedInComponent");
  const database = useImpromatRxDb();
  const [presentIonLoading, dismissIonLoading] = useIonLoading();

  const logoutClick = async () => {
    try {
      presentIonLoading("Logging out...");
      await fetch(backendUrl, {
        method: "POST",
        body: JSON.stringify({
          query: /* GraphQL */ `
            mutation {
              logout
            }
          `,
        }),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      });

      await database.remove();
      await database.destroy();
      logger("Cleared database");
      // reloading at this point is very important to avoid synchronization with the
      // backend database which could potentially sync the deleted database
      window.location.reload();
    } catch {
      displayToast(
        "You can only log out with an active internet connection.",
        2000,
      );
    }
    dismissIonLoading();
  };

  return (
    <div className="ion-padding">
      <h1>Your are signed in!</h1>
      <p>Sign in to synchronize your workshops accross all your devices.</p>
      <IonButton
        onClick={() => {
          logoutClick();
        }}
      >
        Logout
      </IonButton>
    </div>
  );
};
