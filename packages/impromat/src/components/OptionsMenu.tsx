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
import { useBreakpoints } from "../hooks/use-breakpoints";

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

/**
 * General component for displaying a menu with options.
 */
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

  const { md } = useBreakpoints();

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
      {md ? (
        <IonActionSheet
          isOpen={isOpen}
          header={header}
          buttons={options}
          onDidDismiss={() => setIsOpen(false)}
        ></IonActionSheet>
      ) : (
        <IonPopover
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
      )}
    </>
  );
};
