import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { documents, menu, person, search } from "ionicons/icons";
import { Icon } from "../../components/Icon";
import { ImpromatLogoComponent } from "../../components/ImpromatLogoComponent";
import { MainTitleComponent } from "../../components/MainTitleComponent";
import { routeProfile, routeWorkshops } from "../../routes/shared-routes";
import { routeLibrary } from "../library/library-routes";
import { HomeContent } from "./HomeContent";

export const HomeLoggedIn: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
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
            <MainTitleComponent>Impromat</MainTitleComponent>
            <IonText color="dark"></IonText>
          </div>
        </div>
        <IonGrid style={{ maxWidth: "768px" }}>
          <IonRow>
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
              <IonButton expand="full" routerLink={routeProfile()}>
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
      </IonContent>
    </IonPage>
  );
};
