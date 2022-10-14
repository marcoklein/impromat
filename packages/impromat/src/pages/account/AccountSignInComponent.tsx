import { IonNote, IonRouterLink, useIonToast } from "@ionic/react";
import { GoogleSigninButton } from "../../components/GoogleSigninButton";
import { routePrivacyPolicy } from "../../routes/shared-routes";

interface ContainerProps {
  googleLoginHref: string | undefined;
}

export const AccountSignInComponent: React.FC<ContainerProps> = ({
  googleLoginHref,
}) => {
  const [displayToast] = useIonToast();

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

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Sign in to synchronize your workshops accross all your devices.</p>
      <div>
        <GoogleSigninButton onClick={() => loginClick()}></GoogleSigninButton>
      </div>

      <IonNote>
        By signing in you agree to Impromat's{" "}
        <IonRouterLink routerLink={routePrivacyPolicy()}>
          Privacy Policy
        </IonRouterLink>
      </IonNote>
    </div>
  );
};
