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
  heart,
  home,
  information,
  search,
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
import { COLOR_LIKE, COLOR_USER_CREATED } from "../../theme/theme-colors";
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
              <IonText className="ion-margin-start">impromat.app</IonText>
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
        <IonItemGroup>
          <MenuItemComponent
            exact
            routerLink={routeHome()}
            icon={home}
            label="Home"
          ></MenuItemComponent>
        </IonItemGroup>
        <AccountMenuItemComponent></AccountMenuItemComponent>
        <IonItemGroup>
          <IonItemDivider>
            <IonLabel>Workshops</IonLabel>
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
          <IonLabel>Elements</IonLabel>
        </IonItemDivider>
        <MenuItemComponent
          routerLink={routeLibraryTab(Tabs.SEARCH)}
          icon={search}
          label="Explore"
        ></MenuItemComponent>
        <MenuItemComponent
          routerLink={routeLibraryTab(Tabs.LIKED)}
          icon={heart}
          iconColor={COLOR_LIKE}
          label="Likes"
        ></MenuItemComponent>
        <MenuItemComponent
          routerLink={routeLibraryTab(Tabs.CREATE)}
          icon={brush}
          iconColor={COLOR_USER_CREATED}
          label="My Elements"
        ></MenuItemComponent>
        <IonItemGroup></IonItemGroup>
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
