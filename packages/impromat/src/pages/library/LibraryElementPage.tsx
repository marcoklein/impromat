import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "urql";
import { ElementComponent } from "../../components/ElementComponent";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { getFragmentData, graphql } from "../../graphql-client";
import { useCreateWorkshopInputDialog } from "../../hooks/use-add-workshop-input-dialog";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeLibrary } from "../../routes/library-routes";
import { routeWorkshop } from "../../routes/shared-routes";
import { STORAGE_LAST_WORKSHOP_ID } from "../workshop/local-storage-workshop-id";
import { AddToWorkshopDropdown } from "./components/AddToWorkshopDropdown";
import { ElementFavoriteIconComponent } from "./components/ElementFavoriteIconComponent";

const LibraryElementPageQuery = graphql(`
  query LibraryElementQuery($userId: ID, $elementId: ID!) {
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
  const logger = useComponentLogger("ImprobibElementPage");
  const workshopContextId = useMemo(
    () => localStorage.getItem(STORAGE_LAST_WORKSHOP_ID) ?? undefined,
    [],
  );
  const history = useHistory();
  const { isLoggedIn, myUserId } = useIsLoggedIn();
  const [, addToWorkshopMutation] = useUpdateWorkshopMutation();
  const [addToWorkshopSelectId, setAddToWorkshopSelectId] = useState<string>();
  const presentWorkshopInputDialog = useCreateWorkshopInputDialog();

  useStateChangeLogger(workshopContextId, "workshopId", logger);
  useStateChangeLogger(libraryPartId, "libraryPartId", logger);

  const [elementPageQueryResult, reexecuteElementPageQuery] = useQuery({
    query: LibraryElementPageQuery,
    variables: {
      elementId: libraryPartId,
      userId: myUserId!,
    },
  });
  const element = getFragmentData(
    LibraryElement_Element,
    elementPageQueryResult.data?.element,
  );
  const workshops = getFragmentData(
    LibraryElementPage_Query,
    elementPageQueryResult.data,
  );

  useEffect(() => {
    setAddToWorkshopSelectId(
      workshopContextId ?? workshops?.user?.workshops.at(0)?.id ?? undefined,
    );
  }, [workshopContextId, workshops?.user?.workshops]);

  const addToWorkshop = useCallback(() => {
    if (!element) return;
    if (!workshops) throw new Error("no workshops response");
    const workshop = workshops.user?.workshops.find(
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
  }, [
    addToWorkshopMutation,
    addToWorkshopSelectId,
    element,
    history,
    workshops,
  ]);

  const availableWorkshops = useMemo(
    () => [
      // FIXME: workshop is created but element is not added to it
      // { id: "create-new-workshop", name: "+ Create new workshop" },
      ...(workshops?.user?.workshops ?? []),
    ],
    [workshops?.user?.workshops],
  );

  return (
    <PageScaffold
      defaultBackHref={routeLibrary()}
      title={element?.name}
      toolbarButtons={
        <>
          {element && isLoggedIn && (
            <ElementFavoriteIconComponent
              elementFragment={element}
            ></ElementFavoriteIconComponent>
          )}
        </>
      }
      customContentWrapper
      footer={
        <>
          {workshops && isLoggedIn && (
            <IonToolbar>
              <IonItem>
                <AddToWorkshopDropdown
                  workshops={availableWorkshops}
                  workshopId={addToWorkshopSelectId}
                  onWorkshopIdChange={(id) => setAddToWorkshopSelectId(id)}
                ></AddToWorkshopDropdown>
                <div slot="end">
                  <IonButton
                    size="default"
                    aria-label="Add to workshop"
                    onClick={() => {
                      if (addToWorkshopSelectId === "create-new-workshop") {
                        presentWorkshopInputDialog();
                      } else {
                        addToWorkshop();
                      }
                    }}
                    disabled={!addToWorkshopSelectId}
                  >
                    <IonIcon icon={add} slot="icon-only"></IonIcon>
                  </IonButton>
                </div>
              </IonItem>
            </IonToolbar>
          )}
        </>
      }
    >
      <IonContent>
        <PageContentLoaderComponent
          queryResult={elementPageQueryResult}
          reexecuteQuery={reexecuteElementPageQuery}
        >
          {element && (
            <ElementComponent elementFragment={element}></ElementComponent>
          )}
        </PageContentLoaderComponent>
      </IonContent>
    </PageScaffold>
  );
};
