import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const AboutPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1>Mission</h1>
        Support improvisers with an easy to use application for planning
        improvisational theatre workshops using existing exercises and games.
        <h1>Who made this?</h1>
        Me. I am Marco and Impromat is a project that brings together my joy in
        programming and improvisational theatre.
      </IonContent>
    </IonPage>
  );
};
