import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import React from "react";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  error: Error | undefined;
  onRetry: () => void;
}

export const QueryErrorAlert: React.FC<ComponentProps> = ({
  error,
  onRetry,
}) => {
  const { t } = useTranslation("QueryErrorAlert");

  if (!error) {
    return null;
  }

  return (
    <Alert
      severity="error"
      action={<Button onClick={onRetry}>{t("Retry")}</Button>}
    >
      {error.message}
    </Alert>
  );
};
