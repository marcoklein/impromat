import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

interface ContainerProps {
  url?: string;
}

export const BackButton: React.FC<ContainerProps> = ({ url }) => {
  const history = useHistory();
  const { t } = useTranslation("BackButton");

  const goBack = useCallback(() => {
    if (url) {
      history.push(url);
    } else {
      history.goBack();
    }
  }, [history, url]);

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
