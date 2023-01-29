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
import React, { useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { CustomElementInfoItemComponent } from "../../components/CustomElementInfoItemComponent";
import { LicenseItemComponent } from "../../components/LicenseItemComponent";
import { useDocument } from "../../database/use-document";
import { useRxdbMutations } from "../../database/use-rxdb-mutations";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { routeWorkshop } from "../../routes/shared-routes";

export const WorkshopElementPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopElementPage");
  const { id: workshopId, partId: elementId } = useParams<{
    id: string;
    partId: string;
  }>();
  const mutations = useRxdbMutations();
  const [presentInput] = useInputDialog();
  const { document: workshopElement } = useDocument("elements", elementId);
  const { document: basedOnElementFromDatabase } = useDocument(
    "elements",
    workshopElement?.basedOn,
  );

  const basedOnElement = useMemo(() => {
    return basedOnElementFromDatabase ?? workshopElement;
  }, [basedOnElementFromDatabase, workshopElement]);

  useStateChangeLogger(workshopElement, "workshopElement", logger);
  useStateChangeLogger(
    basedOnElementFromDatabase,
    "basedOnElementFromDatabase",
    logger,
  );
  useStateChangeLogger(basedOnElement, "basedOnElement", logger);

  const saveNotesChanges = useCallback(
    (note: string) => {
      if (!mutations || !workshopElement) return;
      const updatedPart = immer(workshopElement, (draft) => {
        draft.note = note;
      });
      mutations.updateWorkshopElement(workshopId, updatedPart);
    },
    [workshopElement, workshopId, mutations],
  );

  const onChangeNoteClick = () => {
    if (!workshopElement) return;
    presentInput({
      header: "Note",
      isMultiline: true,
      onAccept: (text) => {
        saveNotesChanges(text);
      },
      initialText: workshopElement.note ?? "",
    });
  };

  const elementMarkdown = useMemo(() => {
    if (
      workshopElement &&
      workshopElement.markdown &&
      workshopElement.markdown !== ""
    ) {
      return workshopElement.markdown;
    }
    return basedOnElement?.markdown ?? "";
  }, [workshopElement, basedOnElement?.markdown]);

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
          <IonTitle>{basedOnElement?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {workshopElement ? (
          <IonList>
            <IonCard>
              <IonItem lines="none">
                {workshopElement.note ? (
                  <>
                    <IonLabel className="ion-text-wrap">
                      <ReactMarkdown>{workshopElement.note}</ReactMarkdown>
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
                <ReactMarkdown>{elementMarkdown}</ReactMarkdown>
              </div>
            </IonItem>

            {basedOnElement &&
              (!basedOnElement.basedOn && !basedOnElement.sourceName ? (
                <CustomElementInfoItemComponent
                  element={basedOnElement}
                  workshopId={workshopId}
                  showElementLink
                ></CustomElementInfoItemComponent>
              ) : (
                <LicenseItemComponent
                  authorName={basedOnElement.sourceName}
                  authorUrl={basedOnElement.sourceBaseUrl}
                  licenseName={basedOnElement.licenseName}
                  licenseUrl={basedOnElement.licenseUrl}
                  name={basedOnElement.name}
                  sourceUrl={basedOnElement.sourceUrl}
                ></LicenseItemComponent>
              ))}
          </IonList>
        ) : (
          <IonSpinner></IonSpinner>
        )}
      </IonContent>
    </IonPage>
  );
};
