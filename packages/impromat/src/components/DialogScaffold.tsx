import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  open: boolean;
  handleClose: () => void;
  title: ReactNode;
  children: ReactNode;
  hideCloseButton?: boolean;
}

export const DialogScaffold: React.FC<ComponentProps> = ({
  open,
  handleClose,
  title,
  children,
  hideCloseButton,
}) => {
  const { t } = useTranslation("DialogScaffold");

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <Box display="flex" alignItems="start">
        <DialogTitle
          component="h3"
          sx={{
            pb: 0,
            pr: 0,
            pt: 2,
            flex: "1 1 auto",
          }}
        >
          {title}
        </DialogTitle>
        {!hideCloseButton && (
          <IconButton
            sx={{ p: 1.5, mt: 0.5, mr: 0.5, pb: 0 }}
            aria-label={t("Close", { ns: "common" })}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        )}
      </Box>
      {children}
    </Dialog>
  );
};
