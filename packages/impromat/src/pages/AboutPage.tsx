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
import { aboutMarkdownEn } from "../markdown/about.en.md.gen";

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
        <ReactMarkdown>{aboutMarkdownEn}</ReactMarkdown>
      </IonContent>
    </IonPage>
  );
};
