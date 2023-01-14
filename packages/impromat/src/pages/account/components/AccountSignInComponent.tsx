import { IonButton, IonIcon, IonNote, IonRouterLink } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { GoogleSignInButton } from "../../../components/GoogleSignInButton";
import { ImpromatLogoComponent } from "../../../components/ImpromatLogoComponent";
import { MainTitleComponent } from "../../../components/MainTitleComponent";
import { useGoogleLogin } from "../../../hooks/use-google-login";
import { routeHome, routePrivacyPolicy } from "../../../routes/shared-routes";

interface ContainerProps {}

export const AccountSignInComponent: React.FC<ContainerProps> = () => {
  const login = useGoogleLogin();
  return (
    <div
      style={{
        minHeight: "66%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="ion-padding ion-text-center">
        <div
          style={{
            maxHeight: "20%",
            maxWidth: "128px",
            margin: "0 auto",
          }}
        >
          <ImpromatLogoComponent></ImpromatLogoComponent>
        </div>
        <div className="ion-margin-bottom">
          <MainTitleComponent>Sign In to Access Impromat</MainTitleComponent>
        </div>

        <div>
          <GoogleSignInButton onClick={() => login()}></GoogleSignInButton>
        </div>
        <p>
          <IonNote>
            By signing in, you agree to the{" "}
            <IonRouterLink routerLink={routePrivacyPolicy()}>
              Privacy Policy.
            </IonRouterLink>{" "}
            Your improv data is not shared with Google and safely hosted on a
            server based in Germany.
          </IonNote>
        </p>

        <IonButton routerLink={routeHome()} fill="outline">
          <IonIcon slot="start" icon={arrowForward}></IonIcon>
          Learn More
        </IonButton>
      </div>
    </div>
  );
};
