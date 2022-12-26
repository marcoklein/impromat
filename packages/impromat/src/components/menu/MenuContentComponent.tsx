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
  IonListHeader,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  chevronBack,
  create,
  globeOutline,
  heart,
  home,
  information,
  people,
  person,
  search,
} from "ionicons/icons";
import { environment } from "../../environment";
import { Tabs } from "../../pages/library/components/LibraryContentComponent";
import {
  routeLibrary,
  routeLibraryTab,
} from "../../pages/library/library-routes";
import {
  routeAbout,
  routeAccount,
  routeHome,
  routeLegal,
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
          <IonButtons slot="end">
            <IonButton fill="outline">Login</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemGroup>
          <MenuItemComponent
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
          <IonListHeader color="secondary">
            <IonLabel>Workshops</IonLabel>
          </IonListHeader>
          <MenuItemComponent
            routerLink={routeWorkshops()}
            icon={create}
            label="Create"
          ></MenuItemComponent>
          <MenuItemComponent
            routerLink={routeLibrary()}
            icon={globeOutline}
            label="Explore"
          ></MenuItemComponent>
          <MenuItemComponent
            routerLink={routeLibrary()}
            icon={people}
            label="Share"
          ></MenuItemComponent>
        </IonItemGroup>
        <IonItemGroup>
          <IonItemDivider color="secondary">
            <IonLabel>Element Library</IonLabel>
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
          ></MenuItemComponent>
        </IonItemGroup>
        <IonItemGroup>
          <IonItemDivider color="secondary">
            <IonLabel>More</IonLabel>
          </IonItemDivider>
          <MenuItemComponent
            routerLink={routeAbout()}
            icon={information}
            label="About"
          ></MenuItemComponent>
          <MenuItemComponent
            routerLink={routeLegal()}
            icon={information}
            label="Legal Notice"
          ></MenuItemComponent>
          <MenuItemComponent
            routerLink={routePrivacyPolicy()}
            icon={information}
            label="Data Privacy"
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
