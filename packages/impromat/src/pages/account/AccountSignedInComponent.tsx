import { IonButton, IonInput, useIonToast } from "@ionic/react";
import { environment } from "../../environment";

interface ContainerProps {}

const backendUrl = `${environment.API_URL}/graphql`;
export const AccountSignedInComponent: React.FC<ContainerProps> = () => {
  const [displayToast] = useIonToast();

  const logoutClick = async () => {
    try {
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
      displayToast("Logging out...", 1000);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      displayToast("You can only log out with an internet connection.", 2000);
    }
  };

  return (
    <div>
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
