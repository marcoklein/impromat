import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { environment } from "../environment";
import { AccountSignedInComponent } from "./account/AccountSignedInComponent";
import { AccountSignInComponent } from "./account/AccountSignInComponent";

const backendUrl = `${environment.API_URL}/graphql`;

export const AccountPage: React.FC = () => {
  const [googleLoginHref, setGoogleLoginHref] = useState<string | undefined>(
    undefined,
  );
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    (async () => {
      console.log("sending googleAuthRequest");

      try {
        const response = await fetch(backendUrl, {
          method: "POST",
          body: JSON.stringify({
            query: /* GraphQL */ `
              {
                googleAuthUrl
              }
            `,
          }),
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          credentials: "include",
        });
        const json = await response.json();
        setGoogleLoginHref(json.data.googleAuthUrl);
      } catch (e) {
        console.error("error while sending request:", e);
      }

      const responseMe = await fetch(backendUrl, {
        method: "POST",
        body: JSON.stringify({
          query: /* GraphQL */ `
            {
              me {
                userId
              }
            }
          `,
        }),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      });
      const jsonMe = await responseMe.json();
      const userId = jsonMe.data?.me?.userId;
      if (userId) {
        setLoggedIn(true);
        console.log("You are logged in");
      } else {
        setLoggedIn(false);
        console.log("You are not logged in");
      }
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loggedIn === undefined ? (
          <IonSpinner></IonSpinner>
        ) : loggedIn ? (
          <AccountSignedInComponent></AccountSignedInComponent>
        ) : (
          <AccountSignInComponent
            googleLoginHref={googleLoginHref}
          ></AccountSignInComponent>
        )}
      </IonContent>
    </IonPage>
  );
};
