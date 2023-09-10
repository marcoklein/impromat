import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "urql";
import { ElementComponent } from "../../components/ElementComponent";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { STORAGE_LAST_WORKSHOP_ID } from "../workshop/local-storage-workshop-id";
import { ElementFavoriteIconComponent } from "./components/ElementFavoriteIconComponent";
import { routeLibrary } from "../../routes/library-routes";
import { routeWorkshop } from "../../routes/shared-routes";

const LibraryElementPageQuery = graphql(`
  query LibraryElementQuery($userId: ID!, $elementId: ID!) {
    element(id: $elementId) {
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
    user(id: $userId) {
      id
      workshops(input: { owned: true }) {
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
  const { myUserId } = useIsLoggedIn();
  const logger = useComponentLogger("ImprobibElementPage");
  const workshopContextId = useMemo(
    () => localStorage.getItem(STORAGE_LAST_WORKSHOP_ID) ?? undefined,
    [],
  );
  useStateChangeLogger(workshopContextId, "workshopId", logger);
  useStateChangeLogger(libraryPartId, "libraryPartId", logger);

  const [elementPageQueryResult, reexecuteElementPageQuery] = useQuery({
    query: LibraryElementPageQuery,
    pause: !myUserId,
    variables: {
      elementId: libraryPartId,
      userId: myUserId!,
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
      workshopContextId ?? workshops?.user.workshops.at(0)?.id ?? undefined,
    );
  }, [workshopContextId, workshops?.user.workshops]);

  const history = useHistory();

  function addToWorkshop() {
    if (!element) return;
    if (!workshops) throw new Error("no workshops response");
    const workshop = workshops.user.workshops.find(
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
      history.push(`${routeWorkshop(workshop.id)}`);
    });
  }

  return (
    <PageScaffold
      defaultBackHref={routeLibrary({ workshopId: workshopContextId })}
      title={element?.name}
      toolbarButtons={
        element && (
          <ElementFavoriteIconComponent
            elementFragment={element}
          ></ElementFavoriteIconComponent>
        )
      }
      customContentWrapper
      footer={
        workshops && (
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
                {workshops.user.workshops.map(({ id, name }) => (
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
        )
      }
    >
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
    </PageScaffold>
  );
};
