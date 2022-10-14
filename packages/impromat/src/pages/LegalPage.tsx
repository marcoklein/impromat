import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ReactMarkdown from "react-markdown";
import { legalMarkdown } from "./legal-markdown";

export const LegalPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Legal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <ReactMarkdown>{legalMarkdown}</ReactMarkdown>
      </IonContent>
    </IonPage>
  );
};
