import {
  IonButton,
  IonCardSubtitle,
  IonIcon,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import { ImpromatHero } from "../components/ImpromatHero";
import { PageScaffold } from "../components/PageScaffold";
import { useIsLoggedIn } from "../hooks/use-is-logged-in";
import {
  routeAbout,
  routeAccount,
  routeLegal,
  routePrivacyPolicy,
  routeWorkshops,
} from "../routes/shared-routes";
import { HomeContent } from "./home/HomeContent";

export const MoreInfoPage: React.FC = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <PageScaffold noHeader>
      <ImpromatHero>
        <IonText color="dark">
          <IonCardSubtitle>
            App for planning, giving and sharing improvisational theatre
            workshops.
          </IonCardSubtitle>
        </IonText>
        {isLoggedIn && (
          <IonButton routerLink={routeWorkshops()} className="ion-margin-top">
            <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
            Access Impromat
          </IonButton>
        )}
      </ImpromatHero>
      {!isLoggedIn && (
        <div className="ion-padding">
          <HomeContent></HomeContent>
        </div>
      )}

      <IonList>
        <IonItem routerLink={routeAccount()}>Account</IonItem>
        <IonItem routerLink={routeAbout()}>About the Project</IonItem>
        <IonItem routerLink={routeLegal()}>Legal Notice</IonItem>
        <IonItem routerLink={routePrivacyPolicy()}>Data Privacy</IonItem>
      </IonList>
    </PageScaffold>
  );
};
