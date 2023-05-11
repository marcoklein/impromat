import {
  IonButton,
  IonContent,
  IonIcon,
  IonMenuToggle,
  IonPage,
  IonText,
  ScrollCustomEvent,
} from "@ionic/react";
import { arrowForwardOutline, menu } from "ionicons/icons";
import { useState } from "react";
import { ImpromatLogoComponent } from "../../components/ImpromatLogoComponent";
import { MainTitleComponent } from "../../components/MainTitleComponent";
import { routeWorkshops } from "../../routes/shared-routes";
import { HomeContent } from "./HomeContent";

export const HomeLoggedOut: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const onScroll = (event: ScrollCustomEvent) => {
    setScrolled(event.detail.scrollTop > 100);
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        scrollEvents
        onIonScroll={onScroll}
        fullscreen
      >
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            zIndex: 1,
          }}
        >
          <IonMenuToggle>
            <IonButton
              fill={scrolled ? "solid" : "clear"}
              color={scrolled ? "light" : "dark"}
            >
              <IonIcon icon={menu} slot="icon-only"></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </div>

        <div
          style={{
            minHeight: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="ion-text-center ion-margin-top"
            style={{ maxWidth: "768px" }}
          >
            <div
              style={{
                maxHeight: "20%",
                maxWidth: "128px",
                margin: "0 auto",
              }}
            >
              <ImpromatLogoComponent></ImpromatLogoComponent>
            </div>
            <MainTitleComponent>Welcome to impromat.app</MainTitleComponent>
            <IonText color="dark">
              <h1>
                App for planning, giving and sharing improvisational theatre
                workshops.
              </h1>
            </IonText>
            <IonButton routerLink={routeWorkshops()}>
              <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
              Access Impromat
            </IonButton>
          </div>
        </div>
        <HomeContent></HomeContent>
      </IonContent>
    </IonPage>
  );
};
