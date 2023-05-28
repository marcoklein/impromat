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
import { useRef, useState } from "react";

interface ContainerProps {
  header: string;
  options: Option[];
  buttonElement?: JSX.Element;
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popover = useRef<HTMLIonPopoverElement>(null);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setIsOpen(true);
  };

  return (
    <>
      {buttonElement ?? (
        <IonButton fill="clear" onClick={(event) => openPopover(event)}>
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
        onDidDismiss={() => setIsOpen(false)}
      ></IonActionSheet>
    </>
  );
};
