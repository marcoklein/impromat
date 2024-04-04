import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
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
      <Box display="flex" justifyContent="space-between">
        <DialogTitle
          component="h3"
          sx={{
            pb: 1,
            flexShrink: 1,
            overflowX: "auto",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </DialogTitle>
        {!hideCloseButton && (
          <IconButton
            sx={{ p: 1.5, mt: 0.5, mr: 0.5 }}
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
