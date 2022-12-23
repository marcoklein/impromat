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
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { useMyUser } from "../../database/use-my-user";
import { environment } from "../../environment";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { AccountSignedInComponent } from "./components/AccountSignedInComponent";
import { AccountSignInComponent } from "./components/AccountSignInComponent";

const backendUrl = `${environment.API_URL}/graphql`;

export const AccountPage: React.FC = () => {
  const [googleLoginHref, setGoogleLoginHref] = useState<string | undefined>(
    undefined,
  );
  const [isGoogleLoginHrefFetching, setIsGoogleLoginHrefFetching] =
    useState(true);
  const logger = useComponentLogger("AccountPage");
  const { document: myUser, isFetching: isMyUserFetching } = useMyUser(logger);
  useEffect(() => {
    (async () => {
      logger("sending googleAuthRequest");

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
        logger("Set googleLoginHref to %s", json.data.googleAuthUrl);
      } catch (e) {
        logger("error while sending request: %o", e);
      }
      setIsGoogleLoginHrefFetching(false);
      logger("GoogleLoginHref fetching is done");
    })();
  }, [logger]);

  // TODO fixme wait for isMyUserFetching to be false does not work because isMyUserFetching is always true
  // quick fix could be to add a timeout
  const isLoading = isGoogleLoginHrefFetching;
  const isLoggedIn = !isMyUserFetching && myUser !== undefined;
  const isNotLoggedIn = !isLoggedIn;

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
        {isLoading && <IonSpinner></IonSpinner>}
        {!isLoading && isLoggedIn && (
          <AccountSignedInComponent></AccountSignedInComponent>
        )}
        {!isLoading &&
          isNotLoggedIn &&
          (!googleLoginHref ? (
            <>
              <InfoItemComponent
                color="warning"
                message="You need an active internet connection to login."
              ></InfoItemComponent>
            </>
          ) : (
            <AccountSignInComponent
              googleLoginHref={googleLoginHref}
            ></AccountSignInComponent>
          ))}
      </IonContent>
    </IonPage>
  );
};
