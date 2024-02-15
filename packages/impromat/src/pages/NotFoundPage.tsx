import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useComponentLogger } from "../hooks/use-component-logger";
import { routeRootNavigation } from "../routes/shared-routes";

export const NotFoundPage: React.FC = () => {
  useComponentLogger("NotFoundPage");
  const { t } = useTranslation("NotFoundPage");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <h1>{t("Page does not exist")}</h1>
        <Button component={NavLink} to={routeRootNavigation()} fullWidth>
          {t("Go to home page")}
        </Button>
      </Box>
    </Box>
  );
};
