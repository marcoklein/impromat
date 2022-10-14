import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { sad } from "ionicons/icons";
import { FallbackProps } from "react-error-boundary";

export const ErrorFallbackPage: React.FC<FallbackProps> = ({ error }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="danger">
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Error</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div
        className="ion-padding"
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url(assets/error.jpg)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Oh no, something went wrong <IonIcon icon={sad}></IonIcon>
            </IonCardTitle>
            <IonCardSubtitle>Error Message:</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>{error.message}</IonLabel>
          </IonCardContent>
          <IonCardContent>
            <IonButton onClick={() => window.location.reload()}>
              Reload Page
            </IonButton>
          </IonCardContent>
        </IonCard>
      </div>
    </IonContent>
  </IonPage>
);
