import { close, trash } from "ionicons/icons";
import { useState } from "react";
import { ConfirmationAlert } from "../../../components/ConfirmationAlert";
import { OptionsMenu } from "../../../components/OptionsMenu";
import { useComponentLogger } from "../../../hooks/use-component-logger";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  /**
   * Callback when the remove option is clicked.
   */
  onRemoveClick: () => void;
}

/**
 * Options menu for a workshop element (part of a workshop).
 */
export const WorkshopElementOptionsMenu: React.FC<ContainerProps> = ({
  setIsOpen,
  isOpen,
  onRemoveClick,
}) => {
  const logger = useComponentLogger("WorkshopElementOptionsMenu");

  const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);

  return (
    <>
      <OptionsMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header="Options"
        options={[
          {
            text: "Remove",
            role: "destructive",
            icon: trash,
            handler: () => {
              setIsRemoveAlertOpen(true);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
            icon: close,
          },
        ]}
      ></OptionsMenu>
      <ConfirmationAlert
        header="Remove Element from Workshop?"
        confirmText="Remove"
        isOpen={isRemoveAlertOpen}
        onConfirm={() => {
          logger("Removal confirmed");
          onRemoveClick();
        }}
        onOpenChange={setIsRemoveAlertOpen}
      ></ConfirmationAlert>
    </>
  );
};
