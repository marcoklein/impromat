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
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { useGoogleLoginHref } from "../../hooks/use-google-login-href";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { AccountSignedInComponent } from "./components/AccountSignedInComponent";
import { AccountSignInComponent } from "./components/AccountSignInComponent";

export const AccountPage: React.FC = () => {
  const { googleLoginHref, isGoogleLoginHrefFetching } = useGoogleLoginHref();
  const { isLoggedIn } = useIsLoggedIn();

  const isLoading = isGoogleLoginHrefFetching;
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
            <AccountSignInComponent></AccountSignInComponent>
          ))}
      </IonContent>
    </IonPage>
  );
};
