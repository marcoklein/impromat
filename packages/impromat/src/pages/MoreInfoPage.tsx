import { IonItem, IonList } from "@ionic/react";
import { ImpromatHero } from "../components/ImpromatHero";
import { PageScaffold } from "../components/PageScaffold";
import {
  routeAbout,
  routeAccount,
  routeLegal,
  routePrivacyPolicy,
} from "../routes/shared-routes";

export const MoreInfoPage: React.FC = () => {
  return (
    <PageScaffold noHeader>
      <ImpromatHero></ImpromatHero>
      <IonList>
        <IonItem routerLink={routeAccount()}>Account</IonItem>
        <IonItem routerLink={routeAbout()}>About the Project</IonItem>
        <IonItem routerLink={routeLegal()}>Legal Notice</IonItem>
        <IonItem routerLink={routePrivacyPolicy()}>Data Privacy</IonItem>
      </IonList>
    </PageScaffold>
  );
};
