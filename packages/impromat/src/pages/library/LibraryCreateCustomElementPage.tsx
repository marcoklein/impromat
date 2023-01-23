import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
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
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { InfoItemComponent } from "../../components/InfoItemComponent";
import { useDocument } from "../../database/use-document";
import { useRxdbMutations } from "../../database/use-rxdb-mutations";
import { useLogger } from "../../hooks/use-logger";
import { useSearchParam } from "../../hooks/use-search-params";
import { routeWorkshop } from "../../routes/shared-routes";
import { Tabs } from "./components/LibraryContentComponent";
import {
  LIBRARY_ELEMENT_ID_SEARCH_PARAM,
  routeLibrary,
} from "./library-routes";
import { WORKSHOP_CONTEXT_SEARCH_PARAM } from "./workshop-context-search-param";

export const LibraryCreateCustomElementPage: React.FC = () => {
  const workshopId = useSearchParam(WORKSHOP_CONTEXT_SEARCH_PARAM);
  const elementId = useSearchParam(LIBRARY_ELEMENT_ID_SEARCH_PARAM);
  const { document: existingElement } = useDocument("elements", elementId);
  const editExistingItem = !!existingElement;

  const [presentToast] = useIonToast();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const mutations = useRxdbMutations();
  const history = useHistory();
  const logger = useLogger("LibraryCreateCustomElementPage");

  const validateInputs = () => {
    if (!name?.length) {
      presentToast({ message: "Please enter a name", duration: 1500 });
      return;
    }
  };

  useEffect(() => {
    if (existingElement) {
      logger("Loaded existing element");
      setName(existingElement.name);
      setContent(existingElement.markdown ?? "");
    }
  }, [existingElement, logger]);

  const onCreateElementClick = () => {
    if (!mutations) return;
    validateInputs();
    (async () => {
      if (editExistingItem) {
        const newElement = await mutations.updateElement({
          ...existingElement,
          ...{ name, markdown: content },
        });
        const newElementId = newElement.id;
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
        const newElement = await mutations.addNewElement({
          name,
          markdown: content,
        });
        const newElementId = newElement.id;
        if (workshopId) {
          await mutations.addNewElementToWorkshop(workshopId, newElementId, {
            name,
            markdown: content,
          });
          history.push(routeWorkshop(workshopId), {
            direction: "back",
            newElement: newElementId,
          });
        } else {
          history.push(
            {
              pathname: `${routeLibrary()}/${Tabs.CREATE}`,
              search: `?newElement=${newElementId}`,
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
                    workshop you should create a new element.
                  </div>
                </IonNote>
              </>
            </InfoItemComponent>
          )}
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
