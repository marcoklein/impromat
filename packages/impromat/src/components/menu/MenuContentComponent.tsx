import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, documents, home, information, library } from "ionicons/icons";
import { environment } from "../../environment";
import { routeLibrary } from "../../pages/library/library-routes";
import {
  routeAbout,
  routeHome,
  routeLegal,
  routePrivacyPolicy,
  routeWorkshops,
} from "../../routes/shared-routes";
import { AccountMenuItemComponent } from "./AccountMenuItemComponent";
import { MenuItemComponent } from "./MenuItemComponent";

export const MenuContentComponent: React.FC = () => {
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
        <AccountMenuItemComponent></AccountMenuItemComponent>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Navigation</IonLabel>
          </IonItemDivider>
          <MenuItemComponent
            routerLink={routeWorkshops()}
            icon={documents}
            label="Workshops"
          ></MenuItemComponent>
        </IonItemGroup>
        <IonItemGroup>
          <MenuItemComponent
            routerLink={routeLibrary()}
            icon={library}
            label="Exercises & Games"
          ></MenuItemComponent>
        </IonItemGroup>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>More</IonLabel>
          </IonItemDivider>
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
