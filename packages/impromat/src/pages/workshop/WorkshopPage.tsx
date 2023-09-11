import {
  IonButton,
  IonCard,
  IonCardContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonText,
} from "@ionic/react";
import {
  add,
  globe,
  heart,
  heartOutline,
  link,
  lockClosed,
} from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { ElementPreviewCard } from "../../components/ElementPreviewCard";
import { Icon } from "../../components/Icon";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { useUpdateUserLikedWorkshopMutation } from "../../hooks/use-update-liked-workshop-mutation";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeLibrary } from "../../routes/library-routes";
import { routeWorkshops } from "../../routes/shared-routes";
import { COLOR_LIKE } from "../../theme/theme-colors";
import { TeaserGrid } from "../community/TeaserGrid";
import { WorkshopOptionsMenu } from "./WorkshopOptionsMenu";
import { ShareWorkshopModal } from "./components/ShareWorkshopModal";
import { WorkshopElementsComponent } from "./components/WorkshopElementsComponent";
import { STORAGE_LAST_WORKSHOP_ID } from "./local-storage-workshop-id";

const WorkshopPage_Workshop = graphql(`
  fragment WorkshopPage_Workshop on Workshop {
    id
    version
    isPublic
    isListed
    createdAt
    updatedAt
    deleted
    name
    description
    canEdit
    isLiked
    sections {
      name
      elements {
        id
      }
    }
    elementRecommendations {
      id
      ...ElementPreviewItem_Element
    }
    ...WorkshopElementsComponent_Workshop
    ...WorkshopOptionsMenu_Workshop
    ...ShareWorkshopModal_Workshop
  }
`);

const WorkshopByIdQuery = graphql(`
  query WorkshopByIdQuery($id: ID!) {
    workshop(id: $id) {
      ...WorkshopPage_Workshop
    }
  }
`);

/**
 * This feature toggle is used to enable/disable the similar elements feature.
 */
const WORKSHOP_SIMILAR_ELEMENTS_FEATURE_TOGGLE = false;

export const WorkshopPage: React.FC = () => {
  const { id: workshopId } = useParams<{ id: string }>();

  const { isLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    window.localStorage.setItem(STORAGE_LAST_WORKSHOP_ID, workshopId);
  }, [workshopId]);

  const [workshopQueryResult, reexecuteWorkshopQuery] = useQuery({
    query: WorkshopByIdQuery,
    variables: {
      id: workshopId,
    },
  });
  const workshop = getFragmentData(
    WorkshopPage_Workshop,
    workshopQueryResult.data?.workshop,
  );
  const [isReorderingElements, setIsReorderingElements] = useState(false);

  const [, updateWorkshopOrder] = useMutation(
    graphql(`
      mutation UpdateWorkshopItemOrder($input: UpdateWorkshopItemOrder!) {
        updateWorkshopItemOrder(input: $input) {
          id
        }
      }
    `),
  );
  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();

  const logger = useComponentLogger("WorkshopPage");

  useEffect(() => {
    logger("Workshop changed to %O", workshop);
  }, [workshop, logger]);

  const [presentInputDialog] = useInputDialog();

  const changeSectionsOrder = (fromIndex: number, toIndex: number) => {
    if (!workshop) return;
    logger("Change section order from %d to %d", fromIndex, toIndex);
    setIsReorderingElements(true);
    updateWorkshopOrder({
      input: { fromPosition: fromIndex, toPosition: toIndex, workshopId },
    }).finally(() => {
      setTimeout(() => {
        setIsReorderingElements(false);
      }, 2000);
    });
    return true;
  };

  const onCreateSection = () => {
    logger("not implemented");

    if (!workshop) return;
    presentInputDialog({
      header: "Section",
      initialText: "",
      emptyInputMessage: "Please type a section name.",
      placeholder: "e.g. Warmup or Games",
      onAccept: (text) => {
        updateWorkshopMutation({
          input: { id: workshop.id, sections: { create: [{ name: text }] } },
        }).then(() => {
          logger('Created new section "%s"', text);
        });
      },
    });
    logger("Showing add section dialog");
  };

  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);

  const [updateUserLikedWorkshopResult, updateUserLikedWorkshop] =
    useUpdateUserLikedWorkshopMutation();

  const toggleWorkshopLike = useCallback(() => {
    if (!workshop) throw Error("no workshop");
    const newLiked = !workshop.isLiked;
    updateUserLikedWorkshop({
      input: { isLiked: newLiked, workshopId: workshop.id },
    });
  }, [updateUserLikedWorkshop, workshop]);

  return (
    <PageScaffold
      defaultBackHref={routeWorkshops()}
      showProgressBar={isReorderingElements}
      title={`Workshop ${workshop && !workshop.canEdit ? "(View)" : ""}`}
      toolbarButtons={
        <>
          {workshop && isLoggedIn && (
            <IonButton onClick={() => toggleWorkshopLike()}>
              <IonIcon
                icon={workshop.isLiked ? heart : heartOutline}
                color={COLOR_LIKE}
                slot="icon-only"
                aria-label={
                  workshop?.isLiked ? "Remove from likes." : "Add to likes."
                }
              ></IonIcon>
              <IonLoading
                isOpen={updateUserLikedWorkshopResult.fetching}
                message="Updating Like"
              />
            </IonButton>
          )}
          {workshop && workshop.canEdit && (
            <>
              <IonButton
                onClick={() => setIsSharingModalOpen(true)}
                aria-label="Share"
              >
                <Icon
                  slot="start"
                  icon={
                    workshop.isPublic
                      ? workshop.isListed
                        ? globe
                        : link
                      : lockClosed
                  }
                ></Icon>
                <span className="ion-hide-sm-down"> Share</span>
              </IonButton>
              <WorkshopOptionsMenu
                goBackAfterDeletion
                workshopFragment={workshop}
              ></WorkshopOptionsMenu>
            </>
          )}
        </>
      }
    >
      <PageContentLoaderComponent
        queryResult={workshopQueryResult}
        reexecuteQuery={reexecuteWorkshopQuery}
      >
        {workshop && (
          <>
            {workshop.canEdit && (
              <IonFab slot="fixed" vertical="bottom" horizontal="end">
                <IonFabButton>
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
                <IonFabList side="start">
                  <IonButton routerLink={routeLibrary()}>Element</IonButton>
                  <IonButton color="dark" onClick={() => onCreateSection()}>
                    Section
                  </IonButton>
                </IonFabList>
              </IonFab>
            )}

            <IonItem lines="none">
              <IonLabel className="ion-text-wrap">
                <h1 style={{ padding: 0, margin: 0 }}>{workshop.name}</h1>
              </IonLabel>
            </IonItem>
            {workshop.description && (
              <IonItem lines="none">
                <IonLabel className="ion-text-wrap">
                  {workshop.description}
                </IonLabel>
              </IonItem>
            )}

            {workshop.sections.length === 1 &&
            workshop.sections[0].elements.length === 0 &&
            workshop.canEdit &&
            !workshop.sections[0].name ? (
              <IonCard>
                <IonCardContent className="ion-padding">
                  <IonText>
                    Use the bottom right button to add elements. Enjoy designing
                    your workshop!
                  </IonText>
                  <IonButton
                    expand="full"
                    fill="clear"
                    routerLink={routeLibrary()}
                  >
                    Add First Element
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ) : (
              <WorkshopElementsComponent
                key={workshop.id}
                workshopId={workshopId}
                workshopFragment={workshop}
                onChangeOrder={(fromIndex, toIndex) =>
                  changeSectionsOrder(fromIndex, toIndex)
                }
              ></WorkshopElementsComponent>
            )}
            {WORKSHOP_SIMILAR_ELEMENTS_FEATURE_TOGGLE &&
              workshop.elementRecommendations.length > 0 &&
              workshop.canEdit && (
                <TeaserGrid
                  title="Elements that might match"
                  items={workshop.elementRecommendations}
                  itemContent={(element) => (
                    <ElementPreviewCard
                      key={element.id}
                      elementFragment={element}
                    ></ElementPreviewCard>
                  )}
                ></TeaserGrid>
              )}
          </>
        )}
      </PageContentLoaderComponent>
      {workshop && workshop.canEdit && (
        <ShareWorkshopModal
          isSharingModalOpen={isSharingModalOpen}
          setIsSharingModalOpen={setIsSharingModalOpen}
          workshopFragment={workshop}
        ></ShareWorkshopModal>
      )}
    </PageScaffold>
  );
};
