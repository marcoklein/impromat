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

export const PrivacyPolicyPage: React.FC = () => {
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
          <IonTitle>Privacy Policy</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>We value your privacy and store no personal data.</p>
        <h2>Notice</h2>
        <p>
          As Impromat is currently in early stages and only accessible to a
          limited list of beta users we will complete the privacy policy if
          there is a shippable version.
        </p>
        <h2>Offline Version</h2>
        <p>
          As long as you do not use the sign in option via Google you are using
          the offline version of Impromat. The offline version never
          synchronizes or transmitts any workshop creations or other data.
        </p>
      </IonContent>
    </IonPage>
  );
};
