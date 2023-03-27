import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useMutation, useQuery } from "urql";
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { graphql } from "../../graphql-client";
import { ElementVisibility } from "../../graphql-client/graphql";
import { useLogger } from "../../hooks/use-logger";
import { useSearchParam } from "../../hooks/use-search-params";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeWorkshop } from "../../routes/shared-routes";
import { Tabs } from "./components/LibraryContentComponent";
import {
  LIBRARY_ELEMENT_ID_SEARCH_PARAM,
  routeLibrary,
} from "./library-routes";
import { WORKSHOP_CONTEXT_SEARCH_PARAM } from "./workshop-context-search-param";

const LibraryCreateCustomElement_Query = graphql(`
  query LibraryCreateCustomElement_Query($id: ID!) {
    element(id: $id) {
      id
      name
      visibility
      markdown
    }
  }
`);

const UpdateElementMutation = graphql(`
  mutation UpdateElementMutation($input: UpdateElementInput!) {
    updateElement(input: $input) {
      id
    }
  }
`);

const CreateElementMutation = graphql(`
  mutation CreateElementMutation($input: CreateElementInput!) {
    createElement(input: $input) {
      id
    }
  }
`);

/**
 * TODO split into CreateOrEditCustomElementPage
 */
export const LibraryCreateCustomElementPage: React.FC = () => {
  const workshopId = useSearchParam(WORKSHOP_CONTEXT_SEARCH_PARAM);
  const elementId = useSearchParam(LIBRARY_ELEMENT_ID_SEARCH_PARAM);

  const [existingElementQueryResult] = useQuery({
    query: LibraryCreateCustomElement_Query,
    variables: {
      id: elementId ?? "",
    },
    pause: elementId === undefined,
  });
  const [, executeMutation] = useMutation(UpdateElementMutation);
  const [, executeElementMutationResult] = useMutation(CreateElementMutation);
  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();
  const [workshopQueryResult] = useQuery({
    query: graphql(`
      query LibraryCreateCustomElementWorkshopQuery($id: ID!) {
        workshop(id: $id) {
          sections {
            id
          }
        }
      }
    `),
    variables: { id: workshopId ?? "" },
    pause: workshopId === undefined,
  });

  const existingElement = existingElementQueryResult.data?.element;
  const editExistingItem = !!existingElement;

  const [presentToast] = useIonToast();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const history = useHistory();
  const logger = useLogger("LibraryCreateCustomElementPage");

  const validateInputs = () => {
    if (!name?.length) {
      presentToast({ message: "Please enter a name", duration: 1500 });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (existingElement) {
      logger("Loaded existing element");
      setName(existingElement.name);
      setContent(existingElement.markdown ?? "");
      setIsPublic(existingElement.visibility === ElementVisibility.Public);
    }
  }, [existingElement, logger]);

  const onCreateElementClick = () => {
    if (!validateInputs()) return;
    (async () => {
      if (editExistingItem) {
        const newElement = await executeMutation({
          input: {
            id: existingElement.id,
            name,
            visibility: isPublic
              ? ElementVisibility.Public
              : ElementVisibility.Private,
            markdown: content,
          },
        });
        const newElementId = newElement.data?.updateElement.id;
        if (!newElementId) {
          console.error("Could not create element");
          return;
        }
        if (workshopId) {
          history.push(routeWorkshop(workshopId), {
            direction: "back",
            newElement: newElementId,
          });
        } else {
          if (history.length > 1) {
            history.goBack();
          } else {
            history.push({
              pathname: `${routeLibrary()}/${Tabs.CREATE}`,
              search: `?newElement=${newElementId}`,
            });
          }
        }
      } else {
        const result = await executeElementMutationResult({
          input: {
            name,
            visibility: isPublic
              ? ElementVisibility.Public
              : ElementVisibility.Private,
            markdown: content,
          },
        });
        const newElement = result.data?.createElement;
        if (!newElement?.id) {
          console.error("Could not create element");
          return;
        }
        if (workshopId) {
          logger("Last section result=%o", workshopQueryResult);
          const lastSectionId =
            workshopQueryResult.data?.workshop.sections.at(-1)?.id;
          if (!lastSectionId) {
            throw new Error("no last section");
          }
          updateWorkshopMutation({
            input: {
              id: workshopId,
              sections: {
                update: [
                  {
                    id: lastSectionId,
                    elements: {
                      create: [{ basedOn: { connect: { id: newElement.id } } }],
                    },
                  },
                ],
              },
            },
          });
          history.push(routeWorkshop(workshopId), {
            direction: "back",
            newElement: newElement.id,
          });
        } else {
          history.push(
            {
              pathname: `${routeLibrary()}/${Tabs.CREATE}`,
              search: `?newElement=${newElement.id}`,
            },
            { direction: "back" },
          );
        }
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
          <IonTitle>
            {editExistingItem ? "Edit Custom Element" : "Create Custom Element"}
          </IonTitle>
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
          {editExistingItem && (
            <InfoItemComponent>
              <>
                Custom Elements Are Unique
                <IonNote>
                  <div>
                    Saving will update name and content changes for all
                    workshops that use this element.
                  </div>
                  <div>
                    If you want to change name or content for an individual
                    workshop you should create a new element or add a note in
                    the workshop.
                  </div>
                </IonNote>
              </>
            </InfoItemComponent>
          )}
          <IonItem
            style={{
              "--border-color": isPublic
                ? "var(--ion-color-tertiary)"
                : undefined,
              "--border-width": "1px",
            }}
            lines="none"
          >
            <IonCheckbox
              slot="start"
              checked={isPublic}
              onClick={() => setIsPublic((value) => !value)}
            ></IonCheckbox>
            <IonLabel className="ion-text-wrap">
              Share Element with Community
              <IonNote>
                <div>
                  Contribute to the Impromat community with your individual
                  improv element creations.
                </div>
                <div>
                  Shared elements are publicly visible and allows others to copy
                  them and add them to own workshops.
                </div>
                <div>
                  <IonIcon icon={informationCircle}></IonIcon> Attribution and
                  licensing for shared elements is under development.
                </div>
              </IonNote>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        {editExistingItem ? (
          <IonButton expand="full" onClick={onCreateElementClick}>
            {workshopId ? "Save and goto Workshop" : "Save Element"}
          </IonButton>
        ) : (
          <IonButton expand="full" onClick={onCreateElementClick}>
            {workshopId ? "Create and Add to Workshop" : "Create Element"}
          </IonButton>
        )}
      </IonFooter>
    </IonPage>
  );
};
