import {
  Button,
  DialogActions,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogScaffold } from "../../../components/DialogScaffold";

interface ComponentProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleSave: (value: string) => Promise<unknown> | void;
  initialValue?: string;
  TextFieldProps?: TextFieldProps;
  saveText?: string;
}

/**
 * Shows a dialog with a single text field and a save button.
 */
export const TextFieldDialog: React.FC<ComponentProps> = ({
  title,
  open,
  handleClose,
  handleSave,
  initialValue,
  TextFieldProps,
  saveText,
}) => {
  const { t } = useTranslation("TextFieldDialog");
  const [value, setValue] = useState(initialValue ?? "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSaveClick = async () => {
    await handleSave(value);
    handleClose();
  };

  return (
    <DialogScaffold open={open} handleClose={handleClose} title={title}>
      <TextField
        variant="filled"
        value={value}
        onChange={handleInputChange}
        sx={{
          px: 2,
        }}
        autoFocus
        {...TextFieldProps}
      />
      <DialogActions>
        <Button onClick={handleSaveClick}>
          {saveText ?? t("save", { ns: "common" })}
        </Button>
      </DialogActions>
    </DialogScaffold>
  );
};
