import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import immer from "immer";
import { add, barbellOutline, reorderFour } from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { EditableItemComponent } from "../components/EditableItemComponent";
import {
  WorkshopActionSheetComponent,
  WorkshopActionTypes,
} from "../components/WorkshopActionSheetComponent";
import { WorkshopElementsComponent } from "../components/WorkshopElementsComponent";
import { useInputDialog } from "../hooks/use-input-dialog";
import { routeWorkshops } from "../routes/shared-routes";
import { SectionDocType } from "../store/collections/section-collection";
import { useRxdbMutations } from "../store/use-rxdb-mutations";
import { useWorkshop } from "../store/use-workshop";
import { WORKSHOP_HELPER } from "../store/workshop-helper";
import { useComponentLogger } from "../use-component-logger";

export const WorkshopPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const database = useRxdbMutations();
  const history = useHistory();
  const { workshop } = useWorkshop(id);
  const logger = useComponentLogger("WorkshopPage");
  const [workshopHasContent, setWorkshopHasContent] = useState(false);
  useEffect(() => {
    if (workshop) {
      WORKSHOP_HELPER.hasContent(workshop).then(setWorkshopHasContent);
    }
  }, [workshop]);

  const [presentInputDialog] = useInputDialog();

  const changeWorkshopName = (newName: string) => {
    if (!database || !workshop) return;
    const updatedWorkshop = immer(workshop, (draft) => {
      draft.name = newName;
    });
    database.updateWorkshop(updatedWorkshop).then(() => {
      logger("change workshop name to %s", newName);
    });
  };
  const changeWorkshopDescription = (newDescription: string) => {
    if (!database || !workshop) return;
    const updatedWorkshop = immer(workshop, (draft) => {
      draft.description = newDescription;
    });
    database.updateWorkshop(updatedWorkshop).then(() => {
      logger("Changed workshop description");
    });
  };
  const changeSectionsOrder = (fromIndex: number, toIndex: number) => {
    if (!database || !workshop) return;

    WORKSHOP_HELPER.moveItemFromIndexToIndex(workshop, fromIndex, toIndex);

    // (async () => {
    //   for (const section of sections) {
    //     await database.updateWorkshopSection(id, section);
    //     logger("Updating section of workshop");
    //   }
    //   const updatedWorkshop = immer(workshop, (draft) => {
    //     draft.sections = sections.map((section) => section.id);
    //   });
    //   await database.updateWorkshop(updatedWorkshop);
    //   logger("Changed sections in workshop");
    // })();
  };

  const onDeleteWorkshop = useCallback(() => {
    if (!database || !workshop) return;
    // TODO add confirmation dialog
    database.deleteWorkshop(workshop.id).then(() => {
      history.push(routeWorkshops(), { direction: "back" });
    });
    logger("Deleted workshop");
  }, [database, history, logger, workshop]);

  const onRenameWorkshop = () => {
    if (!workshop) return;
    presentInputDialog({
      header: "Rename",
      initialText: workshop.name,
      emptyInputMessage: "Please type a workshop name.",
      onAccept: (text) => changeWorkshopName(text),
    });
    logger("Showing rename Workshop dialog");
  };

  const onCreateSection = () => {
    if (!workshop || !database) return;
    presentInputDialog({
      header: "Section",
      initialText: "",
      emptyInputMessage: "Please type a section name.",
      placeholder: "e.g. Warmup or Games",
      onAccept: (text) => {
        database.createNewSection(workshop.id, text);
      },
    });
    logger("Showing add section dialog");
  };

  const onChangeDescription = () => {
    if (!workshop) return;
    presentInputDialog({
      initialText: workshop.description,
      isMultiline: true,
      header: "Description",
      onAccept: (text) => changeWorkshopDescription(text),
    });
    logger("Showing change description dialog");
  };

  const handleWorkshopEvent = (event: WorkshopActionTypes) => {
    switch (event) {
      case "rename":
        onRenameWorkshop();
        break;
      case "changeDescription":
        onChangeDescription();
        break;
      case "delete":
        onDeleteWorkshop();
        break;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Workshop</IonTitle>
          <IonButtons slot="end">
            {workshop && (
              <WorkshopActionSheetComponent
                workshop={workshop}
                onEvent={(event) => handleWorkshopEvent(event)}
              ></WorkshopActionSheetComponent>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {workshop !== undefined ? (
          <>
            <IonFab slot="fixed" vertical="bottom" horizontal="end">
              <IonFabButton>
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
              <IonFabList side="start">
                <IonButton routerLink={`/workshop/${id}/add-element`}>
                  <IonIcon icon={barbellOutline} slot="start"></IonIcon>Element
                </IonButton>
                <IonButton color="medium" onClick={() => onCreateSection()}>
                  <IonIcon icon={reorderFour} slot="start"></IonIcon>Section
                </IonButton>
              </IonFabList>
            </IonFab>

            <EditableItemComponent
              disableEditing={true}
              text={workshop.name}
              displayName="Workshop Title"
              onChangeText={(newName) => changeWorkshopName(newName)}
              lines="none"
              renderText={(text) => (
                <IonLabel className="ion-text-wrap">
                  <h1 style={{ padding: 0, margin: 0 }}>{text}</h1>
                </IonLabel>
              )}
            ></EditableItemComponent>

            {workshop.description && (
              <EditableItemComponent
                disableEditing={true}
                displayName="Workshop Description"
                text={workshop.description}
                isMultiline={true}
                onChangeText={(text) => changeWorkshopDescription(text)}
                lines="none"
              ></EditableItemComponent>
            )}

            {workshopHasContent ? (
              <WorkshopElementsComponent
                key={workshop.id}
                workshop={workshop}
                onChangeOrder={(fromIndex, toIndex) =>
                  changeSectionsOrder(fromIndex, toIndex)
                }
              ></WorkshopElementsComponent>
            ) : (
              <IonCard>
                <IonCardContent className="ion-padding">
                  <IonText>
                    Use the bottom right button to add elements. Enjoy designing
                    your workshop!
                  </IonText>
                  <IonButton
                    expand="full"
                    fill="clear"
                    routerLink={`/workshop/${id}/add-element`}
                  >
                    Add First Element
                  </IonButton>
                </IonCardContent>
              </IonCard>
            )}
          </>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
    </IonPage>
  );
};
