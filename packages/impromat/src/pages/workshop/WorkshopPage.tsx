import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonMenuButton,
  IonModal,
  IonPage,
  IonProgressBar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  checkmark,
  globe,
  heart,
  heartOutline,
  link,
  lockClosed,
} from "ionicons/icons";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "urql";
import { Icon } from "../../components/Icon";
import { PageContentLoaderComponent } from "../../components/PageContentLoaderComponent";
import { getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import { useUpdateUserLikedWorkshopMutation } from "../../hooks/use-update-liked-workshop-mutation";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { COLOR_LIKE } from "../../theme/theme-colors";
import { routeLibrary } from "../library/library-routes";
import { WorkshopOptionsMenu } from "./WorkshopOptionsMenu";
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
    ...WorkshopElementsComponent_Workshop
    ...WorkshopOptionsMenu_Workshop
  }
`);

const WorkshopByIdQuery = graphql(`
  query WorkshopByIdQuery($id: ID!) {
    workshop(id: $id) {
      ...WorkshopPage_Workshop
    }
  }
`);

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

  const onPublicClick = useCallback(
    (isPublic: boolean) => {
      if (!workshop) return;
      logger("update public workshop state to %s", isPublic);
      updateWorkshopMutation({
        input: { id: workshop.id, isPublic },
      });
    },
    [logger, updateWorkshopMutation, workshop],
  );

  const onListClick = useCallback(
    (isListed: boolean) => {
      if (!workshop) return;
      logger("update workshop listed state to %s", isListed);
      updateWorkshopMutation({
        input: { id: workshop.id, isListed },
      });
    },
    [logger, updateWorkshopMutation, workshop],
  );

  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>
              Workshop {workshop && !workshop.canEdit && "(View)"}
            </IonTitle>
            {isReorderingElements && (
              <IonProgressBar type="indeterminate"></IonProgressBar>
            )}
            <IonButtons slot="end">
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
                  <IonModal
                    isOpen={isSharingModalOpen}
                    onDidDismiss={() => setIsSharingModalOpen(false)}
                    style={{ "--max-height": "50%", "--max-width": "95%" }}
                  >
                    <IonHeader>
                      <IonToolbar>
                        <IonTitle>Share Workshop</IonTitle>
                        <IonButtons slot="end">
                          <IonButton
                            onClick={() => setIsSharingModalOpen(false)}
                          >
                            Close
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding" scrollY={true}>
                      <IonItem
                        lines="none"
                        color={workshop.isPublic ? "success" : undefined}
                        disabled={workshop.isListed}
                      >
                        <Icon icon={link} slot="start"></Icon>
                        <IonCheckbox
                          checked={workshop.isPublic ?? false}
                          labelPlacement="start"
                          onIonChange={(event) =>
                            onPublicClick(event.detail.checked)
                          }
                        >
                          <IonLabel className="ion-text-wrap">
                            Anyone with the link can view
                          </IonLabel>
                        </IonCheckbox>
                      </IonItem>
                      {!workshop.isPublic && !workshop.isListed && (
                        <p>
                          Activate the checkbox to share your workshop via url.
                          Visitors will need the link to see your workshop but
                          will not require an Impromat account.
                        </p>
                      )}
                      {(workshop.isPublic || workshop.isListed) && (
                        <>
                          <IonItem
                            lines="none"
                            color={workshop.isListed ? "success" : undefined}
                          >
                            <Icon icon={globe} slot="start"></Icon>
                            <IonCheckbox
                              checked={workshop.isListed ?? false}
                              labelPlacement="start"
                              onIonChange={(event) =>
                                onListClick(event.detail.checked)
                              }
                            >
                              <IonLabel className="ion-text-wrap">
                                Share with community
                              </IonLabel>
                            </IonCheckbox>
                          </IonItem>
                          {!workshop.isListed && (
                            <p>
                              Your workshop is available to everyone that
                              follows the workshop link. Visitors do not require
                              an account and can view your workshop including
                              sections, elements, and notes.
                            </p>
                          )}
                          {workshop.isListed && (
                            <p>
                              Thanks for your awesome contribution! Your
                              workshop is visible and publicly listed in the
                              Impromat community. Visitors do not require an
                              account and can view your workshop including
                              sections, elements, and notes.
                            </p>
                          )}
                          <IonButton
                            expand="full"
                            color={!isCopied ? "primary" : "medium"}
                            onClick={() => {
                              setIsCopied(true);
                              navigator.clipboard.writeText(
                                window.location.href,
                              );
                            }}
                          >
                            {isCopied ? (
                              <>
                                <IonIcon
                                  slot="start"
                                  icon={checkmark}
                                ></IonIcon>
                                Copied workshop link
                              </>
                            ) : (
                              "Copy workshop link"
                            )}
                          </IonButton>
                        </>
                      )}
                    </IonContent>
                  </IonModal>
                  <WorkshopOptionsMenu
                    goBackAfterDeletion
                    workshopFragment={workshop}
                  ></WorkshopOptionsMenu>
                </>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
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
                      <IonButton routerLink={routeLibrary({ workshopId })}>
                        Element
                      </IonButton>
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
                        Use the bottom right button to add elements. Enjoy
                        designing your workshop!
                      </IonText>
                      <IonButton
                        expand="full"
                        fill="clear"
                        routerLink={routeLibrary({ workshopId })}
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
              </>
            )}
          </PageContentLoaderComponent>
        </IonContent>
      </IonPage>
    </>
  );
};
