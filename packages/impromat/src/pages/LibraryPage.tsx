import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { LibraryContentComponent } from "../components/LibraryContentComponent";

export const LibraryPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Element Library</IonTitle>
        </IonToolbar>
      </IonHeader>

      <LibraryContentComponent></LibraryContentComponent>
    </IonPage>
  );
};
