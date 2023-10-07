import {
  IonActionSheet,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import { ellipsisVertical } from "ionicons/icons";
import { useRef } from "react";

interface ContainerProps {
  header: string;
  options: Option[];
  buttonElement?: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface Option {
  text: string;
  role?: string;
  icon: string;
  handler: () => void;
}

export const OptionsMenu: React.FC<ContainerProps> = ({
  header,
  options,
  buttonElement,
  isOpen,
  setIsOpen,
}) => {
  const popover = useRef<HTMLIonPopoverElement>(null);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setIsOpen(true);
  };

  return (
    <>
      {buttonElement ?? (
        <IonButton
          fill="clear"
          onClick={(event) => openPopover(event)}
          data-testid="menu-button"
        >
          <IonIcon icon={ellipsisVertical}></IonIcon>
        </IonButton>
      )}
      <IonPopover
        className="ion-hide-xl-down"
        isOpen={isOpen}
        ref={popover}
        onDidDismiss={() => setIsOpen(false)}
      >
        <IonList lines="none">
          {options.map((option, index) => (
            <IonItem
              key={index}
              button
              onClick={() => {
                option.handler();
                setIsOpen(false);
              }}
            >
              <IonIcon icon={option.icon} slot="start"></IonIcon>
              <IonLabel>{option.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
      <IonActionSheet
        className="ion-hide-xl-up"
        isOpen={isOpen}
        header={header}
        buttons={options}
        // TODO: fix the bug that the popover closes immediately because the action
        // sheet shows and closes immediately
        // reproducible by right-clicking
        onDidDismiss={() => setIsOpen(false)}
      ></IonActionSheet>
    </>
  );
};
