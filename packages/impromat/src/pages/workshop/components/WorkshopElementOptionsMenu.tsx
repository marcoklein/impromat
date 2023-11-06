import { close, trash } from "ionicons/icons";
import { useState } from "react";
import { ConfirmationAlert } from "../../../components/ConfirmationAlert";
import { OptionsMenu } from "../../../components/OptionsMenu";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation("WorkshopElementOptionsMenu");

  return (
    <>
      <OptionsMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={t("Options", { ns: "common" })}
        options={[
          {
            text: t("Remove", { ns: "common" }),
            role: "destructive",
            icon: trash,
            handler: () => {
              setIsRemoveAlertOpen(true);
            },
          },
          {
            text: t("Cancel", { ns: "common" }),
            role: "cancel",
            handler: () => {},
            icon: close,
          },
        ]}
      ></OptionsMenu>
      <ConfirmationAlert
        header={t("RemoveElement")}
        confirmText={t("Remove", { ns: "common" })}
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
