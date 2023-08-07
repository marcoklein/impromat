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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, document, pencil } from "ionicons/icons";
import React, { useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { ElementComponent } from "../../components/ElementComponent";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { routeWorkshop } from "../../routes/shared-routes";

const WorkshopElementPageQuery = graphql(`
  query WorkshopElementPage($id: ID!) {
    workshopElement(id: $id) {
      id
      note
      basedOn {
        id
        name
        markdown
        sourceUrl
        sourceName
        sourceBaseUrl
        licenseName
        licenseUrl
        owner {
          id
        }
        isOwnerMe
        ...CustomElement_Element
        ...Element_Element
      }
      section {
        id
        workshop {
          id
          canEdit
        }
      }
    }
  }
`);

export const WorkshopElementPage: React.FC = () => {
  const logger = useComponentLogger("WorkshopElementPage");
  const { id: workshopId, partId: workshopElementId } = useParams<{
    id: string;
    partId: string;
  }>();
  const [workshopElementQueryResult, reexecuteWorkshopElementQueryResult] =
    useQuery({
      query: WorkshopElementPageQuery,
      // TODO pass in workshop id
      variables: { id: workshopElementId },
    });
  const workshopElement = workshopElementQueryResult.data?.workshopElement;
  const basedOnElement = workshopElement?.basedOn;
  const [presentInput] = useInputDialog();
  const [, updateWorkshopElementNote] = useMutation(
    graphql(`
      mutation UpdateWorkshopElementNote($input: UpdateWorkshopInput!) {
        updateWorkshop(input: $input) {
          id
          sections {
            id
            elements {
              id
              note
            }
          }
        }
      }
    `),
  );

  useStateChangeLogger(workshopElement, "workshopElement", logger);
  useStateChangeLogger(basedOnElement, "basedOnElement", logger);

  const saveNotesChanges = useCallback(
    (note: string) => {
      if (!workshopElement) return;
      updateWorkshopElementNote({
        input: {
          id: workshopId,
          sections: {
            update: [
              {
                id: workshopElement.section.id,
                elements: { update: [{ id: workshopElement.id, note }] },
              },
            ],
          },
        },
      });
    },
    [updateWorkshopElementNote, workshopElement, workshopId],
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

  const renderNote = useMemo(
    () =>
      (workshopElement &&
        workshopElement.note &&
        workshopElement.note.length > 0) ||
      (workshopElement &&
        !workshopElement.note?.length &&
        !!workshopElement.section.workshop.canEdit),
    [workshopElement],
  );

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
        <PageContentLoaderComponent
          queryResult={workshopElementQueryResult}
          reexecuteQuery={reexecuteWorkshopElementQueryResult}
        >
          {workshopElement && (
            <IonList>
              {renderNote && (
                <IonCard>
                  <IonItem lines="none">
                    {workshopElement.note ? (
                      <>
                        <IonLabel className="ion-text-wrap">
                          <ReactMarkdown>{workshopElement.note}</ReactMarkdown>
                        </IonLabel>
                        {workshopElement.section.workshop.canEdit && (
                          <IonButtons>
                            <IonButton onClick={() => onChangeNoteClick()}>
                              <IonIcon size="small" icon={pencil}></IonIcon>
                            </IonButton>
                          </IonButtons>
                        )}
                      </>
                    ) : (
                      <>
                        {workshopElement.section.workshop.canEdit && (
                          <IonButton
                            fill="clear"
                            onClick={onChangeNoteClick}
                            color="primary"
                          >
                            <IonIcon icon={document} slot="start"></IonIcon>
                            Add Note
                          </IonButton>
                        )}
                      </>
                    )}
                  </IonItem>
                </IonCard>
              )}

              <ElementComponent
                elementFragment={workshopElement.basedOn}
              ></ElementComponent>
            </IonList>
          )}
        </PageContentLoaderComponent>
      </IonContent>
    </IonPage>
  );
};
