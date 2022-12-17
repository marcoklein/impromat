import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useParams } from "react-router";
import { LibraryContentComponent } from "../components/LibraryContentComponent";
import { routeWorkshop } from "../routes/shared-routes";

export const AddWorkshopElementPage: React.FC = () => {
  const { id: workshopId } = useParams<{
    id: string;
  }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              routerLink={routeWorkshop(workshopId)}
              routerDirection="back"
            >
              <IonIcon icon={arrowBack} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Element</IonTitle>
        </IonToolbar>
      </IonHeader>

      <LibraryContentComponent
        workshopId={workshopId}
      ></LibraryContentComponent>
    </IonPage>
  );
};
