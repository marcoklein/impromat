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
import {
  brush,
  close,
  documents,
  home,
  information,
  search,
  star,
} from "ionicons/icons";
import { environment } from "../../environment";
import { Tabs } from "../../pages/library/components/LibraryContentComponent";
import { routeLibraryTab } from "../../pages/library/library-routes";
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
      <IonContent>
        <AccountMenuItemComponent></AccountMenuItemComponent>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Navigation</IonLabel>
          </IonItemDivider>
          <MenuItemComponent
            routerLink={routeWorkshops()}
            icon={documents}
            label="Workshops"
          >
            {/* <IonButton slot="end" fill="solid" color="dark">
              <IonIcon icon={add}></IonIcon>
            </IonButton> */}
          </MenuItemComponent>
        </IonItemGroup>
        <IonItemDivider>
          <IonLabel>Element Library</IonLabel>
        </IonItemDivider>
        <MenuItemComponent
          routerLink={routeLibraryTab(Tabs.SEARCH)}
          icon={search}
          label="Explore"
        ></MenuItemComponent>
        <MenuItemComponent
          routerLink={routeLibraryTab(Tabs.FAVORITES)}
          icon={star}
          label="Favorites"
        ></MenuItemComponent>
        <MenuItemComponent
          routerLink={routeLibraryTab(Tabs.CREATE)}
          icon={brush}
          label="My Elements"
        ></MenuItemComponent>
        <IonItemGroup></IonItemGroup>
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
