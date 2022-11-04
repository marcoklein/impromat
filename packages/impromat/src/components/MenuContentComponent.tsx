import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack, documents, information, person } from "ionicons/icons";
import { useLocation } from "react-router";
import { environment } from "../environment";
import {
  routeAbout,
  routeAccount,
  routePrivacyPolicy,
} from "../routes/shared-routes";

export const MenuContentComponent: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuToggle>
              <IonButton>
                <IonIcon slot="icon-only" icon={chevronBack}></IonIcon>
              </IonButton>
            </IonMenuToggle>
          </IonButtons>
          <IonTitle>Impromat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Navigation</IonLabel>
            </IonItemDivider>
            <IonItem
              routerLink="/workshop"
              color={location.pathname === "/workshop" ? "light" : ""}
            >
              <IonIcon slot="start" icon={documents}></IonIcon>
              <IonLabel>
                <IonText
                  color={location.pathname === "/workshop" ? "light" : ""}
                ></IonText>
                Workshops
              </IonLabel>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Account</IonLabel>
            </IonItemDivider>
            <IonItem
              routerLink={routeAccount()}
              color={location.pathname === routeAccount() ? "light" : ""}
            >
              <IonIcon slot="start" icon={person}></IonIcon>
              <IonLabel>Account</IonLabel>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>More</IonLabel>
            </IonItemDivider>
            <IonItem
              routerLink={routeAbout()}
              color={location.pathname === routeAbout() ? "light" : ""}
            >
              <IonIcon slot="start" icon={information}></IonIcon>
              About
            </IonItem>
            <IonItem
              routerLink={routePrivacyPolicy()}
              color={location.pathname === routePrivacyPolicy() ? "light" : ""}
            >
              <IonIcon slot="start" icon={information}></IonIcon>
              Privacy Policy
            </IonItem>
            {/* <IonItem
              href="https://github.com/marcoklein/impromat"
              target="_blank"
            >
              <IonIcon slot="start" icon={logoGithub}></IonIcon>
              Source Code
            </IonItem> */}
          </IonItemGroup>
        </IonList>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          {/* <div className="ion-padding"> */}
          <IonRouterLink className="ion-padding-horizontal" routerLink="/legal">
            Legal Notice
          </IonRouterLink>
          <IonRouterLink routerLink="/privacy">Data Privacy</IonRouterLink>
          <IonNote slot="end" className="ion-padding-end">
            v{environment.VERSION}
          </IonNote>
          {/* </div> */}
        </IonToolbar>
      </IonFooter>
    </>
  );
};
