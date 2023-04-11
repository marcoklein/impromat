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
import React, { useCallback } from "react";
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
  const [, updateWorkshop] = useMutation(
    graphql(`
      mutation UpdateWorkshopWithElement($input: UpdateWorkshopInput!) {
        updateWorkshop(input: $input) {
          id
          sections {
            elements {
              id
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
      updateWorkshop({
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
    [updateWorkshop, workshopElement, workshopId],
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
          onRetryClick={() =>
            reexecuteWorkshopElementQueryResult({
              requestPolicy: "network-only",
            })
          }
        >
          {workshopElement && (
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
