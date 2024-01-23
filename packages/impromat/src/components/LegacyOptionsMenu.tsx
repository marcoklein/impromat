import {
  IonActionSheet,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBreakpoints } from "../hooks/use-breakpoints";

interface ContainerProps {
  header: string;
  options: Option[];
  buttonElement?: JSX.Element;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  disabled?: boolean;
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
export const LegacyOptionsMenu: React.FC<ContainerProps> = ({
  header,
  options,
  buttonElement,
  isOpen,
  setIsOpen,
  disabled,
}) => {
  const [menuEvent, setMenuEvent] = useState<any>();
  const popover = useRef<HTMLIonPopoverElement>(null);

  useEffect(() => {
    if (menuEvent && popover.current) {
      popover.current.event = menuEvent;
    }
  }, [menuEvent, popover]);

  const openPopover = useCallback(
    (e: any) => {
      setMenuEvent(e);
      setIsOpen(true);
    },
    [setIsOpen, setMenuEvent],
  );

  const { md } = useBreakpoints();

  return (
    <>
      {buttonElement ?? (
        <IconButton
          color="inherit"
          disabled={disabled}
          onClick={(event) => openPopover(event)}
          data-testid="menu-button"
        >
          <MoreVert />
        </IconButton>
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
