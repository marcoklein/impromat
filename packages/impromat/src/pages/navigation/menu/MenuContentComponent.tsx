import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonIcon,
  IonImg,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { environment } from "../../../environment";
import { routeLegal, routePrivacyPolicy } from "../../../routes/shared-routes";
import { ROOT_TABS } from "../RootNavigation";
import { MenuItemComponent } from "./MenuItemComponent";

export const MenuContentComponent: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
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
      <IonContent>
        {Object.entries(ROOT_TABS).map(([key, value]) => (
          <MenuItemComponent
            key={key}
            icon={value.icon}
            label={value.name}
            routerLink={value.route}
            exact={value.exact}
          ></MenuItemComponent>
        ))}
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
    </div>
  );
};
