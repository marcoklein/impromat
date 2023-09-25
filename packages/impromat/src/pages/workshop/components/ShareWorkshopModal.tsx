import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark, globe, link } from "ionicons/icons";
import React, { useCallback, useState } from "react";
import { Icon } from "../../../components/Icon";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useUpdateWorkshopMutation } from "../../../hooks/use-update-workshop-mutation";

export const ShareWorkshopModal_Workshop = graphql(`
  fragment ShareWorkshopModal_Workshop on Workshop {
    id
    isPublic
    isListed
  }
`);

interface ComponentProps {
  isSharingModalOpen: boolean;
  setIsSharingModalOpen: (isOpen: boolean) => void;
  workshopFragment: FragmentType<typeof ShareWorkshopModal_Workshop>;
}

export const ShareWorkshopModal: React.FC<ComponentProps> = ({
  isSharingModalOpen,
  setIsSharingModalOpen,
  workshopFragment,
}) => {
  const logger = useComponentLogger("ShareWorkshopModal");

  const workshop = getFragmentData(
    ShareWorkshopModal_Workshop,
    workshopFragment,
  );

  const [isCopied, setIsCopied] = useState(false);
  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();

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

  return (
    <IonModal
      isOpen={isSharingModalOpen}
      onDidDismiss={() => setIsSharingModalOpen(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Share Workshop</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsSharingModalOpen(false)}>
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
            onIonChange={(event) => onPublicClick(event.detail.checked)}
          >
            <IonLabel className="ion-text-wrap">
              Anyone with the link can view
            </IonLabel>
          </IonCheckbox>
        </IonItem>
        {!workshop.isPublic && !workshop.isListed && (
          <p>
            Activate the checkbox to share your workshop via url. Visitors will
            need the link to see your workshop but will not require an Impromat
            account.
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
                onIonChange={(event) => onListClick(event.detail.checked)}
              >
                <IonLabel className="ion-text-wrap">
                  Share with community
                </IonLabel>
              </IonCheckbox>
            </IonItem>
            {!workshop.isListed && (
              <p>
                Your workshop is available to everyone that follows the workshop
                link. Visitors do not require an account and can view your
                workshop including sections, elements, and notes.
              </p>
            )}
            {workshop.isListed && (
              <p>
                Thanks for your awesome contribution! Your workshop is visible
                and publicly listed in the Impromat community. Visitors do not
                require an account and can view your workshop including
                sections, elements, and notes.
              </p>
            )}
            <IonButton
              expand="full"
              color={!isCopied ? "primary" : "medium"}
              onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              {isCopied ? (
                <>
                  <IonIcon slot="start" icon={checkmark}></IonIcon>
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
  );
};
