import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useRxdbMutations } from "../store/use-rxdb-mutations";

export const CreateElementTabComponent: React.FC = () => {
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
        history.push(`/workshop/${workshopId}`, {
          direction: "back",
          newElement: elementId,
        });
      });
  };

  return (
    <IonList>
      <IonItem>
        <IonLabel position="floating">Name</IonLabel>
        <IonInput
          maxlength={100}
          value={name}
          onIonChange={(event) => setName(event.detail.value!)}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Content</IonLabel>
        <IonTextarea
          value={content}
          onIonChange={(event) => setContent(event.detail.value!)}
        ></IonTextarea>
      </IonItem>
      <IonButton expand="full" onClick={onCreateElementClick}>
        Add Element
      </IonButton>
    </IonList>
  );
};
