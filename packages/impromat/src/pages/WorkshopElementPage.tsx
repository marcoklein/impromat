import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import immer from "immer";
import { arrowBack, document, pencil } from "ionicons/icons";
import React, { useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { LicenseItemComponent } from "../components/LicenseItemComponent";
import { useInputDialog } from "../hooks/use-input-dialog";
import { routeWorkshop } from "../routes/shared-routes";
import { useRxdbMutations } from "../store/use-rxdb-mutations";
import { useWorkshopElement } from "../store/use-workshop-element";

export const WorkshopElementPage: React.FC = () => {
  const { id: workshopId, partId } = useParams<{
    id: string;
    partId: string;
  }>();
  const database = useRxdbMutations();
  const { workshopElement: element, isFetching } = useWorkshopElement(
    workshopId,
    partId,
  );
  const [presentInput] = useInputDialog();

  const changeElementName = (newName: string) => {
    if (!database || !element) return;
    const newElement = immer(element, (draft) => {
      draft.name = newName;
    });
    database.updateWorkshopElement(workshopId, newElement);
  };

  const saveNotesChanges = useCallback(
    (note: string) => {
      if (!database || !element) return;
      const updatedPart = immer(element, (draft) => {
        draft.note = note;
      });
      database.updateWorkshopElement(workshopId, updatedPart);
    },
    [element, workshopId, database],
  );

  const onChangeNoteClick = () => {
    if (!element) return;
    presentInput({
      header: "Note",
      isMultiline: true,
      onAccept: (text) => {
        saveNotesChanges(text);
      },
      initialText: element.note ?? "",
    });
  };

  const onRenameElement = () => {
    if (!element) return;
    presentInput({
      header: "Rename Element",
      emptyInputMessage: "Please type a name.",
      initialText: element.name,
      onAccept: (text) => changeElementName(text),
    });
  };

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
          <IonTitle>{element?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onRenameElement}>
              <IonIcon slot="icon-only" icon={pencil}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {element ? (
          <IonList>
            <IonCard color="light">
              <IonItem lines="none" color="light">
                {element.note ? (
                  <>
                    <IonLabel className="ion-text-wrap">
                      <ReactMarkdown>{element.note}</ReactMarkdown>
                    </IonLabel>
                    <IonButtons>
                      <IonButton onClick={() => onChangeNoteClick()}>
                        <IonIcon size="small" icon={pencil}></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </>
                ) : (
                  <IonButton
                    fill="clear"
                    onClick={onChangeNoteClick}
                    color="primary"
                  >
                    <IonIcon icon={document} slot="start"></IonIcon>Add Note
                  </IonButton>
                )}
              </IonItem>
            </IonCard>

            <IonItem lines="none">
              <div className="ion-text-wrap">
                <ReactMarkdown>{element.markdown ?? ""}</ReactMarkdown>
              </div>
            </IonItem>

            {element.basedOn && (
              <LicenseItemComponent
                authorName={element.basedOn.sourceName}
                authorUrl={element.basedOn.sourceBaseUrl}
                licenseName={element.basedOn.licenseName}
                licenseUrl={element.basedOn.licenseUrl}
                name={element.basedOn.name}
                sourceUrl={element.basedOn.sourceUrl}
              ></LicenseItemComponent>
            )}
          </IonList>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
    </IonPage>
  );
};
