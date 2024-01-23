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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("ShareWorkshopModal");

  return (
    <IonModal
      isOpen={isSharingModalOpen}
      onDidDismiss={() => setIsSharingModalOpen(false)}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t("ShareWorkshop")}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsSharingModalOpen(false)}>
              {t("Close", { ns: "common" })}
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
            <IonLabel className="ion-text-wrap">{t("AnyoneCanView")}</IonLabel>
          </IonCheckbox>
        </IonItem>
        {!workshop.isPublic && !workshop.isListed && (
          <p>{t("CheckboxMessage")}</p>
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
                  {t("ShareWithCommunity")}
                </IonLabel>
              </IonCheckbox>
            </IonItem>
            {!workshop.isListed && <p>{t("ShareInfo")}</p>}
            {workshop.isListed && <p>{t("ThankyouInfo")}</p>}
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
                  {t("CopiedWorkshopLink")}
                </>
              ) : (
                t("CopyWorkshopLink")
              )}
            </IonButton>
          </>
        )}
      </IonContent>
    </IonModal>
  );
};
