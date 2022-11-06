import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { privacyPolicyMarkdownDe } from "../markdown/privacy-policy.de.md.gen";
import { privacyPolicyMarkdownEn } from "../markdown/privacy-policy.en.md.gen";

export const PrivacyPolicyPage: React.FC = () => {
  const router = useIonRouter();

  const [language, setLanguage] = useState<"en" | "de">("en");

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
          <IonTitle>Privacy Policy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {language === "en" && (
          <>
            <IonButton onClick={() => setLanguage("de")} fill="outline">
              Switch to German Version
            </IonButton>
            <ReactMarkdown>{privacyPolicyMarkdownEn}</ReactMarkdown>
          </>
        )}
        {language === "de" && (
          <>
            <IonButton onClick={() => setLanguage("en")} fill="outline">
              Switch to English Version
            </IonButton>
            <ReactMarkdown>{privacyPolicyMarkdownDe}</ReactMarkdown>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};
