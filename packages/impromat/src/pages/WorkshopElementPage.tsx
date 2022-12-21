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
import React, { useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { LicenseItemComponent } from "../components/LicenseItemComponent";
import { useDocument } from "../database/use-document";
import { useRxdbMutations } from "../database/use-rxdb-mutations";
import { useInputDialog } from "../hooks/use-input-dialog";
import { routeWorkshop } from "../routes/shared-routes";
import { useComponentLogger } from "../hooks/use-component-logger";

export const WorkshopElementPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopElementPage");
  const { id: workshopId, partId: elementId } = useParams<{
    id: string;
    partId: string;
  }>();
  const mutations = useRxdbMutations();
  const [presentInput] = useInputDialog();
  const { document: element } = useDocument("elements", elementId);
  const { document: basedOnElement } = useDocument(
    "elements",
    element?.basedOn,
  );

  useEffect(() => {
    logger("basedOnElement=%O", basedOnElement);
  }, [basedOnElement, logger]);

  const changeElementName = (newName: string) => {
    if (!mutations || !element) return;
    const newElement = immer(element.toMutableJSON(), (draft) => {
      draft.name = newName;
    });
    mutations.updateWorkshopElement(workshopId, newElement);
  };

  const saveNotesChanges = useCallback(
    (note: string) => {
      if (!mutations || !element) return;
      const updatedPart = immer(element.toMutableJSON(), (draft) => {
        draft.note = note;
      });
      mutations.updateWorkshopElement(workshopId, updatedPart);
    },
    [element, workshopId, mutations],
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
                <ReactMarkdown>
                  {element.markdown ?? basedOnElement?.markdown ?? ""}
                </ReactMarkdown>
              </div>
            </IonItem>

            {basedOnElement && (
              <LicenseItemComponent
                authorName={basedOnElement.sourceName}
                authorUrl={basedOnElement.sourceBaseUrl}
                licenseName={basedOnElement.licenseName}
                licenseUrl={basedOnElement.licenseUrl}
                name={basedOnElement.name}
                sourceUrl={basedOnElement.sourceUrl}
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
