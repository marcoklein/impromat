import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "urql";
import { ElementComponent } from "../../components/ElementComponent";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { STORAGE_LAST_WORKSHOP_ID } from "../workshop/local-storage-workshop-id";
import { ElementFavoriteIconComponent } from "./components/ElementFavoriteIconComponent";
import { routeLibrary } from "./library-routes";
import { add } from "ionicons/icons";

const LibraryElementPageQuery = graphql(`
  query LibraryElementQuery($id: ID!) {
    element(id: $id) {
      ...LibraryElement_Element
    }
    ...LibraryElementPage_Query
  }
`);

const LibraryElement_Element = graphql(`
  fragment LibraryElement_Element on Element {
    id
    name
    isFavorite
    ...Element_Element
    ...ElementFavoriteIcon_Element
  }
`);

const LibraryElementPage_Query = graphql(`
  fragment LibraryElementPage_Query on Query {
    me {
      workshops {
        id
        name
        sections {
          id
        }
      }
    }
  }
`);

export const LibraryElementPage: React.FC = () => {
  const { libraryPartId } = useParams<{
    libraryPartId: string;
  }>();
  const logger = useComponentLogger("ImprobibElementPage");
  const workshopContextId = useMemo(
    () => localStorage.getItem(STORAGE_LAST_WORKSHOP_ID) ?? undefined,
    [],
  );
  useStateChangeLogger(workshopContextId, "workshopId", logger);
  useStateChangeLogger(libraryPartId, "libraryPartId", logger);

  const [elementPageQueryResult, reexecuteElementPageQuery] = useQuery({
    query: LibraryElementPageQuery,
    variables: {
      id: libraryPartId,
    },
  });
  const [, addToWorkshopMutation] = useUpdateWorkshopMutation();
  const element = getFragmentData(
    LibraryElement_Element,
    elementPageQueryResult.data?.element,
  );
  const workshops = getFragmentData(
    LibraryElementPage_Query,
    elementPageQueryResult.data,
  );

  const [addToWorkshopSelectId, setAddToWorkshopSelectId] = useState<string>();
  useEffect(() => {
    setAddToWorkshopSelectId(
      workshopContextId ?? workshops?.me.workshops.at(0)?.id ?? undefined,
    );
  }, [workshopContextId, workshops?.me.workshops]);

  const history = useHistory();

  function addToWorkshop() {
    if (!element) return;
    if (!workshops) throw new Error("no workshops response");
    const workshop = workshops.me.workshops.find(
      ({ id }) => id === addToWorkshopSelectId,
    );
    if (!workshop) throw new Error("invalid select id");
    const lastSectionId = workshop.sections.at(-1)?.id;
    if (!lastSectionId) throw new Error("no last section id");
    localStorage.setItem(STORAGE_LAST_WORKSHOP_ID, workshop.id);

    addToWorkshopMutation({
      input: {
        id: workshop.id,
        sections: {
          update: [
            {
              id: lastSectionId,
              elements: {
                create: [
                  {
                    basedOn: {
                      connect: {
                        id: element.id,
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    }).then(() => {
      history.push(`/workshop/${workshop.id}`);
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={routeLibrary({ workshopId: workshopContextId })}
            ></IonBackButton>
          </IonButtons>
          <IonTitle>
            <IonLabel className="ion-text-wrap">{element?.name}</IonLabel>
          </IonTitle>
          {element && (
            <IonButtons slot="end">
              <ElementFavoriteIconComponent
                elementFragment={element}
              ></ElementFavoriteIconComponent>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PageContentLoaderComponent
          queryResult={[elementPageQueryResult]}
          reexecuteQuery={[reexecuteElementPageQuery]}
        >
          {element && (
            <ElementComponent elementFragment={element}></ElementComponent>
          )}
        </PageContentLoaderComponent>
      </IonContent>
      {workshops && (
        <IonFooter>
          <IonToolbar>
            <IonItem>
              <IonSelect
                labelPlacement="floating"
                label="Add to Workshop"
                interface="action-sheet"
                aria-label="Select workshop to add"
                value={addToWorkshopSelectId}
                onIonChange={(e) => {
                  setAddToWorkshopSelectId(e.detail.value);
                }}
                placeholder="Select workshop"
              >
                {workshops.me.workshops.map(({ id, name }) => (
                  <IonSelectOption key={id} value={id}>
                    {name}
                  </IonSelectOption>
                ))}
              </IonSelect>
              <div slot="end">
                <IonButton
                  size="default"
                  aria-label="Add to workshop"
                  onClick={() => {
                    addToWorkshop();
                  }}
                  disabled={!addToWorkshopSelectId}
                >
                  <IonIcon icon={add} slot="icon-only"></IonIcon>
                </IonButton>
              </div>
            </IonItem>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};
