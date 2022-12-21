import {
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRouterLink,
  useIonToast,
} from "@ionic/react";
import { useMemo, useState } from "react";
import { GoogleSigninButton } from "../../../components/GoogleSigninButton";
import { InfoItemComponent } from "../../../components/InfoItemComponent";
import { routePrivacyPolicy } from "../../../routes/shared-routes";

interface ContainerProps {
  googleLoginHref: string | undefined;
}

export const AccountSignInComponent: React.FC<ContainerProps> = ({
  googleLoginHref,
}) => {
  const [displayToast] = useIonToast();
  const [isBetaTester, setIsBetaTester] = useState(false);
  const [agreesToPrivacyPolicy, setAgreesToPrivacyPolicy] = useState(false);

  const loginClick = () => {
    if (!googleLoginHref) {
      displayToast(
        "Please check your internet connection or retry in two minutes.",
        2000,
      );
      return;
    }
    window.location.href = googleLoginHref;
  };

  const allowLogin = useMemo(() => {
    return isBetaTester && agreesToPrivacyPolicy;
  }, [isBetaTester, agreesToPrivacyPolicy]);

  return (
    <IonList>
      <IonItem>
        <h1>Synchronize your Workshops</h1>
      </IonItem>
      <IonItem>
        <IonLabel className="ion-text-wrap">
          Sign in to synchronize your workshops across all your devices.
        </IonLabel>
      </IonItem>
      <div className="ion-padding-horizontal">
        <GoogleSigninButton
          onClick={() => loginClick()}
          disabled={!allowLogin}
        ></GoogleSigninButton>
      </div>
      <InfoItemComponent>
        <IonNote>
          Please note that the account synchronization is currently under
          development. Please contact impromat@marcoklein.dev if you have
          questions.
        </IonNote>
      </InfoItemComponent>
      <IonItem>
        <div slot="start">
          <IonCheckbox
            checked={isBetaTester}
            onIonChange={(e) => setIsBetaTester(e.detail.checked)}
          ></IonCheckbox>
        </div>
        <IonLabel className="ion-text-wrap">
          I am aware, that the account feature is under development and
          unstable.
        </IonLabel>
      </IonItem>
      <IonItem>
        <div slot="start">
          <IonCheckbox
            checked={agreesToPrivacyPolicy}
            onIonChange={(e) => setAgreesToPrivacyPolicy(e.detail.checked)}
          ></IonCheckbox>
        </div>
        <IonLabel>
          I agree to the{" "}
          <IonRouterLink routerLink={routePrivacyPolicy()}>
            Privacy Policy
          </IonRouterLink>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};
