import {
  IonItem,
  IonLabel,
  IonList,
  IonRouterLink,
  useIonToast,
} from "@ionic/react";
import { GoogleSigninButton } from "../../../components/GoogleSigninButton";
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
      <IonItem>
        <IonLabel className="ion-text-wrap">
          <h1>Synchronize and share your improv workshops</h1>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel className="ion-text-wrap">
          Sign in to synchronize your workshops across all your devices.
        </IonLabel>
      </IonItem>
      <div className="ion-padding-horizontal">
        <GoogleSigninButton onClick={() => loginClick()}></GoogleSigninButton>
      </div>
      <IonItem>
        <IonLabel>
          By signing in, you agree to the{" "}
          <IonRouterLink routerLink={routePrivacyPolicy()}>
            Privacy Policy
          </IonRouterLink>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};
