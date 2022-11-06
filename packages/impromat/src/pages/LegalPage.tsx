import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import ReactMarkdown from "react-markdown";
import { legalMarkdownEn } from "../markdown/legal.en.md.gen";

export const LegalPage: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {router.canGoBack() ? (
              <IonBackButton></IonBackButton>
            ) : (
              <IonMenuButton></IonMenuButton>
            )}
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
