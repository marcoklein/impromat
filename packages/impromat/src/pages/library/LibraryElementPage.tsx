import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "urql";
import { ElementComponent } from "../../components/ElementComponent";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useSearchParam } from "../../hooks/use-search-params";
import { useStateChangeLogger } from "../../hooks/use-state-change-logger";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { ElementFavoriteIconComponent } from "./components/ElementFavoriteIconComponent";
import { routeLibrary } from "./library-routes";
import { WORKSHOP_CONTEXT_SEARCH_PARAM } from "./workshop-context-search-param";

const LibraryElementQuery = graphql(`
  query LibraryElementQuery($id: ID!) {
    element(id: $id) {
      ...LibraryElement_Element
    }
  }
`);

const LibraryElement_ElementFragement = graphql(`
  fragment LibraryElement_Element on Element {
    id
    name
    isFavorite
    ...Element_Element
    ...ElementFavoriteIcon_Element
  }
`);

const WorkshopQuery = graphql(`
  query WorkshopSectionsQuery($id: ID!) {
    workshop(id: $id) {
      sections {
        id
      }
    }
  }
`);

export const LibraryElementPage: React.FC = () => {
  const { libraryPartId } = useParams<{
    libraryPartId: string;
  }>();
  const workshopId = useSearchParam(WORKSHOP_CONTEXT_SEARCH_PARAM);
  const logger = useComponentLogger("ImprobibElementPage");
  useStateChangeLogger(workshopId, "workshopId", logger);
  useStateChangeLogger(libraryPartId, "libraryPartId", logger);

  const [elementQueryResult, reexecuteElementQuery] = useQuery({
    query: LibraryElementQuery,
    variables: {
      id: libraryPartId,
    },
  });
  const [workshopQueryResult, reexecuteWorkshopQuery] = useQuery({
    query: WorkshopQuery,
    variables: {
      id: workshopId ?? "",
    },
    pause: !workshopId,
  });
  const [, addToWorkshopMutation] = useUpdateWorkshopMutation();
  const element = getFragmentData(
    LibraryElement_ElementFragement,
    elementQueryResult.data?.element,
  );
  const history = useHistory();

  function addToWorkshop() {
    if (!element) return;
    if (!workshopId) throw new Error("no workshop id");
    if (!workshopQueryResult.data) throw new Error("workshop not found");
    const lastSectionId = workshopQueryResult.data.workshop.sections.at(-1)?.id;
    if (!lastSectionId) throw new Error("no last section id");

    addToWorkshopMutation({
      input: {
        id: workshopId,
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
      history.push(`/workshop/${workshopId}`, {
        direction: "back",
        newElement: "last",
      });
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={routeLibrary({ workshopId })}
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
          queryResult={[
            elementQueryResult,
            ...(workshopId ? [workshopQueryResult] : []),
          ]}
          reexecuteQuery={[
            reexecuteElementQuery,
            ...(workshopId ? [reexecuteWorkshopQuery] : []),
          ]}
        >
          {element && (
            <ElementComponent elementFragment={element}></ElementComponent>
          )}
        </PageContentLoaderComponent>
      </IonContent>
      {elementQueryResult.data && workshopQueryResult.data && workshopId && (
        <IonFooter>
          <IonToolbar>
            <IonButton
              onClick={() => {
                addToWorkshop();
              }}
              color="primary"
              expand="full"
              fill="solid"
            >
              Add to Workshop
            </IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};
