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
import { add } from "ionicons/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { EditableItemComponent } from "../../components/EditableItemComponent";
import {
  WorkshopDocType,
  WorkshopDocument,
} from "../../database/collections/workshop/workshop-collection";
import { useRxdbMutations } from "../../database/use-rxdb-mutations";
import { WORKSHOP_HELPER } from "../../database/workshop-helper";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useImpromatRxDb } from "../../hooks/use-impromat-rx-db";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { routeWorkshops } from "../../routes/shared-routes";
import { routeLibrary } from "../library/library-routes";
import {
  WorkshopActionSheetComponent,
  WorkshopActionTypes,
} from "./components/WorkshopActionSheetComponent";
import { WorkshopElementsComponent } from "./components/WorkshopElementsComponent";

export const WorkshopPage: React.FC = () => {
  const { id: workshopId } = useParams<{ id: string }>();
  const mutations = useRxdbMutations();
  const history = useHistory();
  // const { document: workshop } = useDocument("workshops", workshopId);
  const [workshop, setWorkshop] = useState<WorkshopDocument>();
  const [workshopDoc, setWorkshopDoc] = useState<WorkshopDocType>();

  const logger = useComponentLogger("WorkshopPage");
  const [workshopHasContent, setWorkshopHasContent] =
    useState<Awaited<ReturnType<typeof WORKSHOP_HELPER.hasContent>>>(
      "noContent",
    );
  const database = useImpromatRxDb();
  useEffect(() => {
    if (workshop && database) {
      const subscription = database.$.subscribe(() => {
        WORKSHOP_HELPER.hasContent(workshop).then(setWorkshopHasContent);
      });
      WORKSHOP_HELPER.hasContent(workshop).then(setWorkshopHasContent);
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [workshop, database]);

  useEffect(() => {
    if (!database) return;
    function fetchWorkshop() {
      database.workshops.findByIds([workshopId]).then((result) => {
        const resultWorkshop = result.get(workshopId);
        logger(
          "workshopCollection found workshop with id %s: %O",
          workshopId,
          resultWorkshop?.toJSON(),
        );
        if (!resultWorkshop) {
          setWorkshop(undefined);
          setWorkshopDoc(undefined);
        } else {
          setWorkshop(resultWorkshop);
          setWorkshopDoc(resultWorkshop.toMutableJSON());
        }
      });
    }
    const subscription = database.collections.workshops.$.subscribe(
      (changeEvent) => {
        logger("workshopCollection on change", changeEvent);
        fetchWorkshop();
      },
    );
    fetchWorkshop();
    return () => {
      subscription.unsubscribe();
    };
  }, [database, workshopId, logger]);

  useEffect(() => {
    logger("Workshop has content = %O", workshopHasContent);
  }, [workshopHasContent, logger]);

  useEffect(() => {
    logger("Workshop changed to %O", workshop);
  }, [workshop, logger]);

  const workshopName = useMemo(() => {
    logger("workshopName changed to %s", workshopDoc?.name || "");
    if (workshopDoc) {
      return workshopDoc.name;
    } else return "";
  }, [logger, workshopDoc]);

  const [presentInputDialog] = useInputDialog();

  const changeWorkshopName = (newName: string) => {
    if (!mutations || !workshop) return;
    mutations.updateWorkshopName(workshop.id, newName).then(() => {
      logger("change workshop name to %s", newName);
    });
  };
  const changeWorkshopDescription = (newDescription: string) => {
    if (!mutations || !workshop) return;
    const updatedWorkshop = immer(workshop.toMutableJSON(), (draft) => {
      draft.description = newDescription;
    });
    mutations.updateWorkshop(updatedWorkshop).then(() => {
      logger("Changed workshop description");
    });
  };
  const changeSectionsOrder = (fromIndex: number, toIndex: number) => {
    if (!mutations || !workshop) return;

    (async () => {
      const populatedSection = await workshop.sections_;
      const { sections } = WORKSHOP_HELPER.moveItemFromIndexToIndex(
        populatedSection.map((section) => section.toMutableJSON()),
        fromIndex,
        toIndex,
      );
      await Promise.all([
        database.sections.bulkUpsert(sections),
        workshop.atomicUpdate((draft) => {
          draft.sections = sections.map(({ id }) => id);
          return draft;
        }),
      ]);
    })();
  };

  const onDeleteWorkshop = useCallback(() => {
    if (!mutations || !workshop) return;
    // TODO add confirmation dialog
    mutations.deleteWorkshop(workshop.id).then(() => {
      history.push(routeWorkshops(), { direction: "back" });
    });
    logger("Deleted workshop");
  }, [mutations, history, logger, workshop]);

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
    if (!workshop || !mutations) return;
    presentInputDialog({
      header: "Section",
      initialText: "",
      emptyInputMessage: "Please type a section name.",
      placeholder: "e.g. Warmup or Games",
      onAccept: (text) => {
        mutations.createNewSection(workshop.id, text).then(() => {
          logger('Created new section "%s"', text);
        });
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
                <IonButton routerLink={routeLibrary({ workshopId })}>
                  Element
                </IonButton>
                <IonButton color="dark" onClick={() => onCreateSection()}>
                  Section
                </IonButton>
              </IonFabList>
            </IonFab>
            <EditableItemComponent
              disableEditing={true}
              text={workshopName}
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
            {workshopHasContent === "missingData" && <IonSpinner></IonSpinner>}
            {workshopHasContent === "hasContent" ? (
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
                    routerLink={routeLibrary({ workshopId })}
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
