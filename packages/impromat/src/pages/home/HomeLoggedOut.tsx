import {
  IonButton,
  IonContent,
  IonIcon,
  IonMenuToggle,
  IonText,
  ScrollCustomEvent,
} from "@ionic/react";
import { arrowForwardOutline, menu } from "ionicons/icons";
import { useState } from "react";
import { ImpromatHero } from "../../components/ImpromatHero";
import { PageScaffold } from "../../components/PageScaffold";
import { routeWorkshops } from "../../routes/shared-routes";
import { HomeContent } from "./HomeContent";

export const HomeLoggedOut: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const onScroll = (event: ScrollCustomEvent) => {
    setScrolled(event.detail.scrollTop > 100);
  };

  return (
    <PageScaffold noHeader customContentWrapper>
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

        <ImpromatHero title="Welcome to impromat.app">
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
        </ImpromatHero>

        <HomeContent></HomeContent>
      </IonContent>
    </PageScaffold>
  );
};
