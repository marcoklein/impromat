import { IonButton, IonIcon, IonLabel, IonListHeader } from "@ionic/react";
import { closeOutline, swapVertical } from "ionicons/icons";

interface ContainerProps {
  isReordering: boolean;
  onReorderEvent?: (
    event: "start" | "save" | "cancel",
    isReordering: boolean,
  ) => void;
  disableReordering?: boolean;
}

export const WorkshopElementsHeaderComponent: React.FC<ContainerProps> = ({
  isReordering,
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
      <IonListHeader color="medium">
        <IonLabel>Elements</IonLabel>
        <IonButton
          expand="block"
          size="small"
          onClick={() => onReorderClick()}
          color="dark"
          fill="clear"
        >
          <IonIcon slot="icon-only" icon={swapVertical}></IonIcon>
        </IonButton>
      </IonListHeader>
    );
  }

  return (
    <IonListHeader color="primary">
      <IonLabel>Change order with right handle</IonLabel>
      <IonButton
        color="light"
        size="small"
        fill="solid"
        onClick={() => onReorderClick()}
      >
        <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
        Stop Ordering
      </IonButton>
    </IonListHeader>
  );
};
