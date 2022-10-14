import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { WorkshopElementComponent } from "../components/WorkshopElementComponent";
import { Element } from "../store/schema.gen";
import { routeWorkshopAddElement } from "../routes/shared-routes";
import { useImprobibElements } from "../store/improbib/use-improbib-elements";
import { useRxdbMutations } from "../store/use-rxdb-mutations";

export const ImprobibElementPage: React.FC = () => {
  const { id: workshopId, libraryPartId } = useParams<{
    id: string;
    libraryPartId: string;
  }>();
  const database = useRxdbMutations();
  const improbibElements = useImprobibElements();
  const [improbibElement, setImprobibElement] = useState<Element>();
  const history = useHistory();

  useEffect(() => {
    if (!improbibElements) return;
    const result = improbibElements.find(
      (element) => element.id === libraryPartId,
    );
    setImprobibElement(result);
  }, [improbibElements, libraryPartId]);

  function addToWorkshop() {
    if (!database || !improbibElement) return;
    database.addImprovElementToWorkshop(workshopId, improbibElement);
    history.push(`/workshop/${workshopId}`, {
      direction: "back",
      newElement: improbibElement.id,
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={routeWorkshopAddElement(workshopId)}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>{improbibElement?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {improbibElement ? (
          <WorkshopElementComponent
            element={improbibElement}
          ></WorkshopElementComponent>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            onClick={() => {
              addToWorkshop();
            }}
            color="primary"
            expand="full"
            fill="solid"
          >
            Add to Workshop
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
