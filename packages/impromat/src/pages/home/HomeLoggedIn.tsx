import {
  IonButton,
  IonCol,
  IonGrid,
  IonMenuToggle,
  IonRow,
} from "@ionic/react";
import { documents, globe, menu, person, search } from "ionicons/icons";
import { Icon } from "../../components/Icon";
import { ImpromatHero } from "../../components/ImpromatHero";
import { PageScaffold } from "../../components/PageScaffold";
import { routeLibrary } from "../../routes/library-routes";
import {
  routeAccount,
  routeCommunity,
  routeWorkshops,
} from "../../routes/shared-routes";
import { HomeContent } from "./HomeContent";

export const HomeLoggedIn: React.FC = () => {
  return (
    <PageScaffold noHeader>
      <ImpromatHero></ImpromatHero>
      <IonGrid style={{ maxWidth: "768px" }}>
        <IonRow>
          <IonCol sizeSm="6" sizeXs="12">
            <IonButton expand="full" routerLink={routeCommunity()}>
              <Icon icon={globe} slot="start"></Icon>
              Community
            </IonButton>
          </IonCol>
          <IonCol sizeSm="6" sizeXs="12">
            <IonButton expand="full" routerLink={routeWorkshops()}>
              <Icon icon={documents} slot="start"></Icon>
              Workshops
            </IonButton>
          </IonCol>
          <IonCol sizeSm="6" sizeXs="12">
            <IonButton expand="full" routerLink={routeLibrary()}>
              <Icon icon={search} slot="start"></Icon>
              Elements
            </IonButton>
          </IonCol>
          <IonCol sizeSm="6" sizeXs="12">
            <IonButton expand="full" routerLink={routeAccount()}>
              <Icon icon={person} slot="start"></Icon>
              Profile
            </IonButton>
          </IonCol>
          <IonCol sizeSm="6" sizeXs="12">
            <IonMenuToggle>
              <IonButton color="medium" expand="full">
                <Icon icon={menu} slot="start"></Icon>
                Open Menu
              </IonButton>
            </IonMenuToggle>
          </IonCol>
        </IonRow>

        <div className="ion-padding">
          <HomeContent></HomeContent>
        </div>
      </IonGrid>
    </PageScaffold>
  );
};
