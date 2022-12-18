import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Tabs } from "../components/LibraryContentComponent";
import { useRxdbMutations } from "../database/use-rxdb-mutations";
import {
  routeLibrary,
  routeWorkshop,
  routeWorkshopAddElement,
} from "../routes/shared-routes";

export const CreateCustomElementPage: React.FC = () => {
  const { id: workshopId } = useParams<{
    id: string;
  }>();

  const [presentToast] = useIonToast();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const database = useRxdbMutations();
  const history = useHistory();

  const onCreateElementClick = () => {
    if (!database || !name?.length) {
      presentToast({ message: "Please enter a name", duration: 1500 });
      return;
    }
    database
      .addNewElementToWorkshop(workshopId, name, content)
      .then((elementId) => {
        if (workshopId) {
          history.push(routeWorkshop(workshopId), {
            direction: "back",
            newElement: elementId,
          });
        } else {
          history.push({
            pathname: `${routeLibrary()}/${Tabs.CREATE}`,
            search: `?newElement=${elementId}`,
          });
          // history.push(`${routeLibrary()}/${Tabs.CREATE}`, {
          //   direction: "back",
          //   newElement: elementId,
          // });
        }
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={
                workshopId
                  ? `${routeWorkshopAddElement(workshopId)}/${Tabs.CREATE}`
                  : `${routeLibrary()}/${Tabs.CREATE}`
              }
            ></IonBackButton>
          </IonButtons>
          <IonTitle>Create Custom Element</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              maxlength={200}
              value={name}
              onIonChange={(event) => setName(event.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Content</IonLabel>
            <IonTextarea
              rows={10}
              value={content}
              onIonChange={(event) => setContent(event.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonButton expand="full" onClick={onCreateElementClick}>
          Add Element
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};
