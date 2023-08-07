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
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { globe } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useMutation, useQuery } from "urql";
import { Icon } from "../../components/Icon";
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { graphql } from "../../graphql-client";
import { ElementVisibility } from "../../graphql-client/graphql";
import { useLogger } from "../../hooks/use-logger";
import { useSearchParam } from "../../hooks/use-search-params";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeWorkshop } from "../../routes/shared-routes";
import { COLOR_SHARED } from "../../theme/theme-colors";
import { ElementTagsItem } from "./components/ElementTagsItem";
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
      languageCode
      tags {
        id
        name
      }
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

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [languageCode, setLanguageCode] = useState<string>("en");
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  const [isPublic, setIsPublic] = useState(false);
  const history = useHistory();
  const logger = useLogger("LibraryCreateCustomElementPage");

  const isInputValid = useMemo(
    () => name && name.length > 0 && languageCode,
    [name, languageCode],
  );

  useEffect(() => {
    if (existingElement) {
      logger("Loaded existing element");
      setName(existingElement.name);
      setContent(existingElement.markdown ?? "");
      setLanguageCode(existingElement.languageCode ?? "en");
      setTags(existingElement.tags.map(({ id, name }) => ({ id, name })));
      setIsPublic(existingElement.visibility === ElementVisibility.Public);
    }
  }, [existingElement, logger]);

  const onCreateElementClick = () => {
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
            languageCode,
            tags: {
              connect: tags.map((tag) => ({
                id: tag.id,
              })),
            },
          },
        });
        const newElementId =
          newElement.data?.updateElement?.id ?? existingElement.id;
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
        if (!languageCode) throw new Error("No language code");
        const result = await executeElementMutationResult({
          input: {
            name,
            visibility: isPublic
              ? ElementVisibility.Public
              : ElementVisibility.Private,
            markdown: content,
            languageCode,
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
            workshopQueryResult.data?.workshop?.sections.at(-1)?.id;
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
          }).then(() => {
            history.push(routeWorkshop(workshopId), {
              direction: "back",
              newElement: newElement.id,
            });
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
            <IonInput
              placeholder="Please enter a name"
              label="Name (required)"
              labelPlacement="floating"
              maxlength={200}
              value={name}
              type="text"
              onIonInput={(event) => setName(event.detail.value!.toString())}
            ></IonInput>
          </IonItem>
          <ElementTagsItem
            tags={tags}
            onTagsChange={(tags) => setTags(tags)}
          ></ElementTagsItem>
          <IonItem>
            <IonTextarea
              label="Content"
              labelPlacement="floating"
              rows={10}
              value={content}
              onIonInput={(event) => setContent(event.detail.value!)}
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <Icon tablerIcon="language" slot="start"></Icon>
            <IonSelect
              value={languageCode}
              onIonChange={(event) => setLanguageCode(event.detail.value)}
              label="Language (required)"
              labelPlacement="floating"
              placeholder="Select language"
            >
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="de">Deutsch</IonSelectOption>
            </IonSelect>
          </IonItem>
          {existingElement &&
          existingElement.visibility === ElementVisibility.Public ? (
            <>
              <IonItem>
                <IonIcon
                  slot="start"
                  icon={globe}
                  color={COLOR_SHARED}
                ></IonIcon>
                <IonLabel className="ion-text-wrap">
                  Community Element
                  <div>
                    <IonNote>
                      This is a public community element of Impromat. It is
                      shared with everyone and editable by Impromat users.
                    </IonNote>
                  </div>
                </IonLabel>
              </IonItem>
              <InfoItemComponent
                color="warning"
                message="Changes to community elements are visible in a public activity record."
              ></InfoItemComponent>
            </>
          ) : (
            <>
              <IonItem
                style={{
                  "--border-color": isPublic
                    ? "var(--ion-color-danger)"
                    : undefined,
                  "--border-width": "1px",
                }}
                lines="none"
              >
                <IonCheckbox
                  slot="start"
                  checked={isPublic}
                  onIonChange={(e) => setIsPublic(e.detail.checked)}
                ></IonCheckbox>
                <IonLabel className="ion-text-wrap">
                  Add to Public Impromat Elements
                  <IonNote>
                    <div>
                      Contribute your element to the public Impromat community.
                      Shared elements are visible, searchable, and editable by
                      Impromat users.
                    </div>
                  </IonNote>
                  <IonNote>
                    <IonText color="danger">Sharing cannot be undone.</IonText>
                  </IonNote>
                </IonLabel>
              </IonItem>
            </>
          )}
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
        </IonList>
      </IonContent>
      <IonFooter>
        {editExistingItem ? (
          <IonButton
            expand="full"
            onClick={onCreateElementClick}
            disabled={!isInputValid}
          >
            {workshopId ? "Save and goto Workshop" : "Save Element"}
          </IonButton>
        ) : (
          <IonButton
            expand="full"
            onClick={onCreateElementClick}
            disabled={!isInputValid}
          >
            {workshopId ? "Create and Add to Workshop" : "Create Element"}
          </IonButton>
        )}
      </IonFooter>
    </IonPage>
  );
};
