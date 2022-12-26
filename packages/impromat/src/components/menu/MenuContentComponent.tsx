import {
  IonButton,
  IonButtons,
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
import {
  albums,
  close,
  home,
  information,
  library,
  person,
} from "ionicons/icons";
import { environment } from "../../environment";
import { Tabs } from "../../pages/library/components/LibraryContentComponent";
import { routeLibraryTab } from "../../pages/library/library-routes";
import {
  routeAbout,
  routeAccount,
  routeHome,
  routeLegal,
  routePrivacyPolicy,
  routeWorkshops,
} from "../../routes/shared-routes";
import { InfoItemComponent } from "../InfoItemComponent";
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
        {/* <IonToolbar>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Account</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Login to backup and synchronize workshops.
            </IonCardContent>
            <IonButton
              fill="outline"
              expand="block"
              routerLink={routeAccount()}
            >
              <IonIcon icon={person} slot="start"></IonIcon>
              Login
            </IonButton>
          </IonCard>
        </IonToolbar> */}
      </IonHeader>
      <IonContent fullscreen>
        <IonItemGroup>
          <MenuItemComponent
            exact
            routerLink={routeHome()}
            icon={home}
            label="Home"
          ></MenuItemComponent>
        </IonItemGroup>
        <MenuItemComponent
          routerLink={routeAccount()}
          icon={person}
          label="Account"
        ></MenuItemComponent>
        <IonItemGroup>
          {/* <IonListHeader color="secondary">
            <IonLabel>Workshops</IonLabel>
          </IonListHeader> */}
          <MenuItemComponent
            routerLink={routeWorkshops()}
            icon={albums}
            label="Workshops"
          ></MenuItemComponent>
          {/* <MenuItemComponent
            routerLink={routeLibrary()}
            icon={globeOutline}
            label="Explore"
          ></MenuItemComponent> */}
          {/* <MenuItemComponent
            routerLink={routeLibrary()}
            icon={people}
            label="Share"
          ></MenuItemComponent> */}
        </IonItemGroup>
        <IonItemGroup>
          <MenuItemComponent
            routerLink={routeLibraryTab(Tabs.SEARCH)}
            icon={library}
            label="Exercises & Games"
          ></MenuItemComponent>
          {/* <IonItemDivider color="secondary">
            <IonLabel>Exercises & Games</IonLabel>
          </IonItemDivider>
          <MenuItemComponent
            routerLink={routeLibraryTab(Tabs.SEARCH)}
            icon={search}
            label="Explore"
          ></MenuItemComponent>
          <MenuItemComponent
            routerLink={routeLibraryTab(Tabs.FAVORITES)}
            icon={heart}
            label="Like"
          ></MenuItemComponent>
          <MenuItemComponent
            routerLink={routeLibraryTab(Tabs.CREATE)}
            icon={create}
            label="Create"
          ></MenuItemComponent> */}
        </IonItemGroup>
        <IonItemGroup>
          {/* <IonItemDivider>
            <IonLabel>More</IonLabel>
          </IonItemDivider> */}
          <MenuItemComponent
            routerLink={routeAbout()}
            icon={information}
            label="About"
          ></MenuItemComponent>
          {/* <MenuItemComponent
            routerLink={routeLegal()}
            icon={information}
            label="Legal Notice"
          ></MenuItemComponent>
          <MenuItemComponent
            routerLink={routePrivacyPolicy()}
            icon={information}
            label="Data Privacy"
          ></MenuItemComponent> */}
        </IonItemGroup>
      </IonContent>
      <IonFooter className="ion-no-border">
        <IonToolbar>
          <InfoItemComponent
            color="light"
            message="Impromat is currently under development and not feature complete
            yet."
          ></InfoItemComponent>
        </IonToolbar>
        <IonToolbar>
          {/* <IonNote className="ion-padding-horizontal">
            It is a beautiful day.
          </IonNote>
          <IonNote slot="end" className="ion-padding-horizontal">
            v{environment.VERSION}
          </IonNote> */}
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
