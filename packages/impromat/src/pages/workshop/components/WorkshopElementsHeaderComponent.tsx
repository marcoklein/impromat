import { IonButton, IonIcon, IonLabel, IonListHeader } from "@ionic/react";
import { checkmark } from "ionicons/icons";

interface ContainerProps {
  isReordering: boolean;
  canEdit: boolean;
  onReorderEvent?: (
    event: "start" | "save" | "cancel",
    isReordering: boolean,
  ) => void;
  disableReordering?: boolean;
}

export const WorkshopElementsHeaderComponent: React.FC<ContainerProps> = ({
  isReordering,
  canEdit,
  onReorderEvent,
}) => {
  const onReorderClick = () => {
    if (isReordering) {
      if (onReorderEvent) onReorderEvent("save", false);
    } else {
      if (onReorderEvent) onReorderEvent("start", true);
    }
  };

  if (!isReordering) {
    return (
      <IonListHeader
        color="medium"
        style={{ position: "sticky", top: 0, zIndex: 2 }}
      >
        <IonLabel>Elements</IonLabel>
        {canEdit && (
          <IonButton
            expand="block"
            size="small"
            onClick={() => onReorderClick()}
            fill="outline"
          >
            Reorder
          </IonButton>
        )}
      </IonListHeader>
    );
  }

  return (
    <IonListHeader
      color="primary"
      style={{ position: "sticky", top: 0, zIndex: 2 }}
    >
      <IonLabel>Change order with right handle</IonLabel>
      <IonButton
        color="light"
        size="default"
        fill="solid"
        onClick={() => onReorderClick()}
      >
        <IonIcon slot="icon-only" icon={checkmark}></IonIcon>
        Save Order
      </IonButton>
    </IonListHeader>
  );
};
