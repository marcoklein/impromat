import { Button, DialogActions, DialogContent, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useComponentLogger } from "../hooks/use-component-logger";
import { DialogScaffold } from "./DialogScaffold";

interface ComponentProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  initialValue: string;
  onSave: (value: string) => Promise<void> | void;
}

export const DatePickerDialog: React.FC<ComponentProps> = ({
  title,
  isOpen,
  onSave,
  onClose,
  initialValue,
}) => {
  const logger = useComponentLogger("DatePickerDialog");
  const { t } = useTranslation("DatePickerDialog");
  const [value, setValue] = useState<Dayjs | null>(dayjs(initialValue));

  const theme = useTheme();

  return (
    <DialogScaffold
      hideCloseButton
      open={isOpen}
      handleClose={() => onClose()}
      title={title}
    >
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ width: "100%" }}
            desktopModeMediaQuery={theme.breakpoints.up("md")}
            value={value}
            onChange={(newValue) => {
              logger("workshopDate", newValue);
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>
          {t("Cancel", { ns: "common" })}
        </Button>
        <Button
          onClick={async () => {
            await onSave(value?.toISOString() ?? "");
            onClose();
          }}
        >
          {t("save", { ns: "common" })}
        </Button>
      </DialogActions>
    </DialogScaffold>
  );
};
