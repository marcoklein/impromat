import { IonButton, IonIcon, useIonActionSheet } from "@ionic/react";
import { close, create, ellipsisVertical, pencil, trash } from "ionicons/icons";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useHistoryListener } from "../../../hooks/use-history-listener";
import { WorkshopDocType } from "../../../database/collections/workshop/workshop-collection";

interface ContainerProps {
  workshop: WorkshopDocType;
  onEvent: (event: WorkshopActionTypes) => void;
}

export type WorkshopActionTypes = "delete" | "rename" | "changeDescription";

export const WorkshopActionSheetComponent: React.FC<ContainerProps> = ({
  workshop,
  onEvent,
}) => {
  const [presentActionSheet, dismissActionSheet] = useIonActionSheet();
  const history = useHistory();
  useHistoryListener(
    useCallback(() => {
      dismissActionSheet();
    }, [dismissActionSheet]),
  );

  const openMenu = useCallback(() => {
    history.push({
      pathname: history.location.pathname,
      search: "dialog",
    });
    presentActionSheet({
      buttons: [
        {
          icon: trash,
          text: "Delete",
          handler: () => {
            onEvent("delete");
          },
          role: "destructive",
        },
        {
          icon: pencil,
          text: "Rename",
          handler: () => {
            onEvent("rename");
          },
        },
        {
          icon: create,
          text: `${workshop.description.length ? "Change" : "Add"} Description`,
          handler: () => {
            onEvent("changeDescription");
          },
        },
        {
          icon: close,
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
  }, [history, presentActionSheet, workshop.description.length, onEvent]);

  return (
    <IonButton onClick={() => openMenu()}>
      <IonIcon icon={ellipsisVertical}></IonIcon>
    </IonButton>
  );
};
