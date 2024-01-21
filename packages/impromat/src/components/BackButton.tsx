import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

interface ContainerProps {}

export const BackButton: React.FC<ContainerProps> = () => {
  const history = useHistory();
  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);
  const { t } = useTranslation("BackButton");

  return (
    <IconButton
      onClick={goBack}
      sx={{ mr: 2 }}
      color="inherit"
      aria-label={t("back")}
    >
      <ArrowBack />
    </IconButton>
  );
};
