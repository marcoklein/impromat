import {
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRouterLink,
  useIonToast,
} from "@ionic/react";
import { GoogleSignInButton } from "../../../components/GoogleSignInButton";
import { enableAutoLogin } from "../../../database/enable-auto-login";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useImpromatRxDb } from "../../../hooks/use-impromat-rx-db";
import { routePrivacyPolicy } from "../../../routes/shared-routes";

interface ContainerProps {
  googleLoginHref: string | undefined;
}

export const AccountSignInComponent: React.FC<ContainerProps> = ({
  googleLoginHref,
}) => {
  const [displayToast] = useIonToast();
  const database = useImpromatRxDb();
  const logger = useComponentLogger("AccountSignInComponent");

  const loginClick = () => {
    logger("loginClick");
    if (!googleLoginHref) {
      displayToast(
        "Please check your internet connection or retry in two minutes.",
        2000,
      );
      return;
    }
    if (process.env.REACT_APP_AUTO_LOGIN) {
      enableAutoLogin(database, true);
    } else {
      window.location.href = googleLoginHref;
    }
  };

  return (
    <IonList>
      <IonItem lines="none">
        <IonLabel className="ion-text-wrap">
          <h1>Synchronize and share your improv workshops</h1>
        </IonLabel>
      </IonItem>
      <IonItem lines="none">
        <IonLabel className="ion-text-wrap">
          Sign in to synchronize your workshops across all your devices.
        </IonLabel>
      </IonItem>
      <div className="ion-padding-horizontal">
        <GoogleSignInButton onClick={() => loginClick()}></GoogleSignInButton>
      </div>
      <IonItem lines="none">
        <IonLabel className="ion-text-wrap">
          <IonNote>
            By signing in, you agree to the{" "}
            <IonRouterLink routerLink={routePrivacyPolicy()}>
              Privacy Policy
            </IonRouterLink>
          </IonNote>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};
