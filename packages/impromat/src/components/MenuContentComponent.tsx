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
import {
  chevronBack,
  documents,
  information,
  person,
  star,
} from "ionicons/icons";
import { useLocation } from "react-router";
import { environment } from "../environment";
import {
  routeAbout,
  routeAccount,
  routeFavoriteElements,
  routeLegal,
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
            <IonItem
              disabled
              routerLink={routeFavoriteElements()}
              color={
                location.pathname === routeFavoriteElements() ? "light" : ""
              }
            >
              <IonIcon
                slot="start"
                icon={star}
                color={
                  location.pathname === routeFavoriteElements()
                    ? "yellow-4"
                    : ""
                }
              ></IonIcon>
              <IonLabel>
                <IonText
                  color={
                    location.pathname === routeFavoriteElements() ? "light" : ""
                  }
                ></IonText>
                Favorite Elements
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
          </IonItemGroup>
        </IonList>
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
