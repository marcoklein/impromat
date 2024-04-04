import { Remove } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveOptions } from "../../../components/ResponsiveOptions";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { ConfirmDialog } from "./ConfirmationDialog";

interface ContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onRemoveClick: () => void;
  disabled?: boolean;
}

/**
 * Options menu for a workshop element (part of a workshop).
 */
export const WorkshopElementOptionsMenu: React.FC<ContainerProps> = ({
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
      <ResponsiveOptions
        title={t("Options", { ns: "common" })}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <List disablePadding>
          <ListItemButton
            onClick={() => {
              setIsOpen(false);
              setIsRemoveAlertOpen(true);
            }}
          >
            <ListItemIcon>
              <Remove />
            </ListItemIcon>
            <ListItemText>{t("Remove", { ns: "common" })}</ListItemText>
          </ListItemButton>
        </List>
      </ResponsiveOptions>

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
