import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonReorder,
} from "@ionic/react";
import {
  chevronForward,
  ellipsisVertical,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect, useRef } from "react";
import "./WorkshopElementItemComponent.css";

interface ContainerProps {
  color?: string;
  routerLink?: string;
  isReordering?: boolean;
  onRemoveClick?: () => void;
  onEditClick?: () => void;
  children: JSX.Element;
  endSlot?: JSX.Element;
  startSlot?: JSX.Element;
  itemProps?: React.ComponentPropsWithoutRef<typeof IonItem>;
}

export const SlidingItemComponent: React.FC<ContainerProps> = ({
  color,
  routerLink,
  isReordering,
  onRemoveClick,
  onEditClick,
  children,
  itemProps,
  endSlot,
  startSlot,
}) => {
  const optionsRef = useRef<any>();

  const closeOptions = () => {
    optionsRef.current.close();
  };

  const toggleOptionsClicked = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if ((await optionsRef.current.getSlidingRatio()) > 0) {
      optionsRef.current.close();
    } else {
      optionsRef.current.open();
    }
  };

  useEffect(() => {
    if (isReordering) {
      optionsRef.current.close();
    }
  }, [isReordering]);

  return (
    <IonItemSliding ref={optionsRef} disabled={isReordering}>
      <IonItem
        routerLink={routerLink}
        detail={false}
        color={color}
        {...itemProps}
      >
        <div slot="start">{startSlot}</div>

        {isReordering && <IonReorder slot="end"></IonReorder>}
        <IonLabel className="ion-text-wrap">{children}</IonLabel>
        {!isReordering && (
          <IonButtons>
            {endSlot}
            <IonButton
              onClick={(event) => toggleOptionsClicked(event)}
              color="medium"
            >
              <IonIcon icon={ellipsisVertical}></IonIcon>
            </IonButton>
          </IonButtons>
        )}
      </IonItem>
      <IonItemOptions side="end">
        {onRemoveClick && (
          <IonItemOption
            color="danger"
            onClick={() => {
              closeOptions();
              onRemoveClick();
            }}
          >
            Delete
            <IonIcon slot="start" icon={trashOutline}></IonIcon>
          </IonItemOption>
        )}
        {onEditClick && (
          <IonItemOption
            color="primary"
            onClick={() => {
              closeOptions();
              onEditClick();
            }}
          >
            Rename
            <IonIcon slot="start" icon={pencilOutline}></IonIcon>
          </IonItemOption>
        )}
        <IonItemOption
          color="medium"
          onClick={(event) => toggleOptionsClicked(event)}
        >
          <IonIcon slot="icon-only" icon={chevronForward}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
