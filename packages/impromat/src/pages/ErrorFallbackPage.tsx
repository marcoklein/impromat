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
import { useTranslation } from "react-i18next";

export const ErrorFallbackPage: React.FC<FallbackProps> = ({ error }) => {
  const { t } = useTranslation("ErrorFallbackPage");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>{t("Error")}</IonTitle>
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
                {t("OhNo")}
                <IonIcon icon={sad}></IonIcon>
              </IonCardTitle>
              <IonCardSubtitle>{t("ErrorMessage")}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonLabel>{error.message}</IonLabel>
            </IonCardContent>
            <IonCardContent>
              <IonButton onClick={() => window.location.reload()}>
                {t("ReloadPage")}
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};
