import { Button, DialogActions } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { DialogScaffold } from "../../../components/DialogScaffold";

interface ComponentProps {
  title: string;
  confirmText?: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Dialog to confirm an action.
 */
export const ConfirmDialog: React.FC<ComponentProps> = ({
  title,
  open,
  onClose,
  onConfirm,
  confirmText,
}) => {
  const { t } = useTranslation("ConfirmDialog");

  return (
    <DialogScaffold
      hideCloseButton
      open={open}
      handleClose={onClose}
      title={title}
    >
      <DialogActions>
        <Button onClick={onClose}>{t("Cancel", { ns: "common" })}</Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </DialogActions>
    </DialogScaffold>
  );
};
