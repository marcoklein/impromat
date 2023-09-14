import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItemGroup,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, home, information, logIn } from "ionicons/icons";
import { environment } from "../../../environment";
import { useGoogleLogin } from "../../../hooks/use-google-login";
import {
  routeAbout,
  routeAccount,
  routeHome,
  routeLegal,
  routePrivacyPolicy,
} from "../../../routes/shared-routes";
import { GoogleSignInButton } from "../../../components/GoogleSignInButton";
import { MenuItemComponent } from "./MenuItemComponent";

export const SignInMenuContentComponent: React.FC = () => {
  const triggerGoogleLogin = useGoogleLogin();
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IonImg
                style={{ width: "24px", height: "24px" }}
                src="/assets/logo.svg"
                alt="Impromat Logo"
              ></IonImg>
              <IonText className="ion-margin-start">Impromat</IonText>
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonMenuToggle>
              <IonButton>
                <IonIcon slot="icon-only" icon={close}></IonIcon>
              </IonButton>
            </IonMenuToggle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Access Impromat</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <GoogleSignInButton
              onClick={() => triggerGoogleLogin()}
              expand="block"
            ></GoogleSignInButton>
            <IonNote>
              By signing in, you agree to the{" "}
              <IonRouterLink routerLink={routePrivacyPolicy()}>
                Privacy Policy.
              </IonRouterLink>
            </IonNote>
          </IonCardContent>
        </IonCard>
        <IonItemGroup>
          <MenuItemComponent
            exact
            routerLink={routeHome()}
            icon={home}
            label="Home Page"
          ></MenuItemComponent>
          <MenuItemComponent
            routerLink={routeAbout()}
            icon={information}
            label="About"
          ></MenuItemComponent>
          <MenuItemComponent
            exact
            routerLink={routeAccount()}
            icon={logIn}
            label="Sign In"
          ></MenuItemComponent>
        </IonItemGroup>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonRouterLink
            className="ion-padding-horizontal"
            routerLink={routeLegal()}
            color="medium"
          >
            Legal Notice
          </IonRouterLink>
          <IonRouterLink routerLink={routePrivacyPolicy()} color="medium">
            Data Privacy
          </IonRouterLink>
          <IonNote slot="end" className="ion-padding-end">
            v{environment.VERSION}
          </IonNote>
        </IonToolbar>
      </IonFooter>
    </>
  );
};
