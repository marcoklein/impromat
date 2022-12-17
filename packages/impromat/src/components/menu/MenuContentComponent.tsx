import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  chevronBack,
  documents,
  information,
  library,
  person,
} from "ionicons/icons";
import { environment } from "../../environment";
import {
  routeAbout,
  routeAccount,
  routeLegal,
  routeLibrary,
  routePrivacyPolicy,
  routeWorkshops,
} from "../../routes/shared-routes";
import { MenuItemComponent } from "./MenuItemComponent";

export const MenuContentComponent: React.FC = () => {
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
            <MenuItemComponent
              routerLink={routeWorkshops()}
              icon={documents}
              label="Workshops"
            ></MenuItemComponent>
            <MenuItemComponent
              routerLink={routeLibrary()}
              icon={library}
              label="Library"
            ></MenuItemComponent>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Account</IonLabel>
            </IonItemDivider>
            <MenuItemComponent
              routerLink={routeAccount()}
              icon={person}
              label="Account"
            ></MenuItemComponent>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>More</IonLabel>
            </IonItemDivider>
            <MenuItemComponent
              routerLink={routeAbout()}
              icon={information}
              label="About"
            ></MenuItemComponent>
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
