import {
  IonCheckbox,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import React from "react";
import { PageScaffold } from "../../components/PageScaffold";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useCreateWorkshopMutation } from "../../hooks/use-create-workshop-mutation";

export const CreateWorkshopPage: React.FC = () => {
  const logger = useComponentLogger("CreateWorkshopPage");

  const [, createWorkshopMutation] = useCreateWorkshopMutation();

  return (
    <PageScaffold title={"Create Workshop"}>
      {/* TODO remove padding from Modal Scaffold */}
      {/* TODO use grid layout? */}
      <IonList>
        <IonItem>
          <IonInput label="Name" labelPlacement="floating"></IonInput>
        </IonItem>
        <IonItem>
          <IonTextarea
            label="Description"
            labelPlacement="floating"
          ></IonTextarea>
        </IonItem>
        {/* <IonItem>
          <IonInput
            type="number"
            label="Participants"
            labelPlacement="floating"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
            type="time"
            label="Duration (hh:mm)"
            labelPlacement="floating"
          ></IonInput>
        </IonItem> */}
        <IonItemDivider>
          <IonLabel></IonLabel>
        </IonItemDivider>
        <IonItem>
          <IonSelect label="Template Workshop" labelPlacement="floating">
            <IonSelectOption value="">None</IonSelectOption>
            <IonSelectOption value="1">Workshop 1</IonSelectOption>
            <IonSelectOption value="2">Workshop 2</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonCheckbox>Use Base Layout</IonCheckbox>
        </IonItem>
      </IonList>
    </PageScaffold>
  );
};

// const createWorkshopClick = useCallback(() => {
//   presentInputDialog({
//     header: "Workshop Name",
//     message: "Enter a name for your workshop. You can change it later:",
//     placeholder: "Workshop name...",
//     buttonText: "Create",
//     emptyInputMessage: "Please enter a name for your workshop.",
//     onAccept: async (text) => {
//       const { error, data } = await createWorkshopMutation({
//         input: { name: text },
//       });
//       const id = data?.createWorkshop.id;
//       if (error || !id) {
//         return;
//       }
//       logger("Adding new workshop with id %s", id);
//       const navigateTo = routeWorkshop(id);
//       history.replace(navigateTo);
//       logger("Navigating to %s", navigateTo);
//     },
//   });
// }, [presentInputDialog, createWorkshopMutation, logger, history]);
