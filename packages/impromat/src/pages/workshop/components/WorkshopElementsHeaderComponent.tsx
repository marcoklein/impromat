import { IonButton, IonIcon, IonLabel, IonListHeader } from "@ionic/react";
import { checkmark, closeOutline, swapVertical } from "ionicons/icons";

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
    if (onReorderEvent) onReorderEvent("start", true);
  };

  const onReorderSaveClick = () => {
    if (onReorderEvent) onReorderEvent("save", false);
  };

  const onReorderCancelClick = () => {
    if (onReorderEvent) onReorderEvent("cancel", false);
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
      <IonLabel>Change Order</IonLabel>
      <div>
        <IonButton
          color="light"
          size="small"
          fill="solid"
          onClick={() => onReorderCancelClick()}
        >
          <IonIcon slot="icon-only" icon={closeOutline}></IonIcon>
          Cancel
        </IonButton>
        <IonButton
          color="success"
          size="small"
          fill="solid"
          onClick={() => onReorderSaveClick()}
        >
          <IonIcon slot="icon-only" icon={checkmark}></IonIcon>
          Save
        </IonButton>
      </div>
    </IonListHeader>
  );
};
