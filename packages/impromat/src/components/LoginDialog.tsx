import { DialogContent, Typography } from "@mui/material";
import { LoginSection } from "../pages/login/LoginSection";
import { DialogScaffold } from "./DialogScaffold";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  title: string;
  open: boolean;
  handleClose: () => void;
}

/**
 * Shows a dialog that prompts users to login.
 */
export const LoginDialog: React.FC<ComponentProps> = ({
  title,
  open,
  handleClose,
}) => {
  const { t } = useTranslation("LoginDialog");
  return (
    <DialogScaffold open={open} handleClose={handleClose} title={title}>
      <DialogContent>
        <Typography>{t("message")}</Typography>
        <LoginSection />
      </DialogContent>
    </DialogScaffold>
  );
};
