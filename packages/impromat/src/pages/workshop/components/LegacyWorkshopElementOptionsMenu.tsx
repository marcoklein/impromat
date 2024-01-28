import { close, trash } from "ionicons/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LegacyOptionsMenu } from "../../../components/LegacyOptionsMenu";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { ConfirmDialog } from "./ConfirmationDialog";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  /**
   * Callback when the remove option is clicked.
   */
  onRemoveClick: () => void;
  disabled?: boolean;
}

/**
 * Options menu for a workshop element (part of a workshop).
 */
export const LegacyWorkshopElementOptionsMenu: React.FC<ContainerProps> = ({
  setIsOpen,
  isOpen,
  onRemoveClick,
  disabled,
}) => {
  const logger = useComponentLogger("WorkshopElementOptionsMenu");
  const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);
  const { t } = useTranslation("WorkshopElementOptionsMenu");

  return (
    <>
      <LegacyOptionsMenu
        disabled={disabled}
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
      ></LegacyOptionsMenu>
      <ConfirmDialog
        title={t("RemoveElement")}
        confirmText={t("Remove", { ns: "common" })}
        open={isRemoveAlertOpen}
        onConfirm={() => {
          logger("Removal confirmed");
          onRemoveClick();
          setIsRemoveAlertOpen(false);
        }}
        onClose={() => setIsRemoveAlertOpen(false)}
      ></ConfirmDialog>
    </>
  );
};
