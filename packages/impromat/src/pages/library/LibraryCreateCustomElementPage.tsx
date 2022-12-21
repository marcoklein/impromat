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
import { useHistory } from "react-router";
import { useRxdbMutations } from "../../database/use-rxdb-mutations";
import { useSearchParam } from "../../hooks/use-search-params";
import { routeWorkshop } from "../../routes/shared-routes";
import { Tabs } from "./components/LibraryContentComponent";
import { routeLibrary } from "./library-routes";
import { WORKSHOP_CONTEXT_SEARCH_PARAM } from "./workshop-context-search-param";

export const LibraryCreateCustomElementPage: React.FC = () => {
  const workshopId = useSearchParam(WORKSHOP_CONTEXT_SEARCH_PARAM);

  const [presentToast] = useIonToast();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const database = useRxdbMutations();
  const history = useHistory();

  const validateInputs = () => {
    if (!name?.length) {
      presentToast({ message: "Please enter a name", duration: 1500 });
      return;
    }
  };

  const onCreateElementClick = () => {
    if (!database) return;
    validateInputs();
    (async () => {
      const newElement = await database.addNewElement({
        name,
        markdown: content,
      });
      const newElementId = newElement.id;
      if (workshopId) {
        await database.addNewElementToWorkshop(workshopId, newElementId, {
          name,
          markdown: content,
        });
        history.push(routeWorkshop(workshopId), {
          direction: "back",
          newElement: newElementId,
        });
      } else {
        history.push({
          pathname: `${routeLibrary()}/${Tabs.CREATE}`,
          search: `?newElement=${newElementId}`,
        });
      }
    })();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`${routeLibrary({ workshopId })}/${Tabs.CREATE}`}
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
          {workshopId ? "Create and Add to Workshop" : "Create Element"}
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};
