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
import { legalMarkdownEn } from "../markdown/legal.en.md.gen";

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
        <ReactMarkdown>{legalMarkdownEn}</ReactMarkdown>
      </IonContent>
    </IonPage>
  );
};
