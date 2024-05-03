import { Info } from "@mui/icons-material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ImpromatLogoComponent } from "../../components/ImpromatLogoComponent";
import { routeHome } from "../../routes/shared-routes";
import { LoginSection } from "./LoginSection";

export const LoginPage: React.FC = () => {
  const { t } = useTranslation("LoginPage");

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box sx={{ overflow: "auto", maxWidth: theme.breakpoints.values.sm }}>
        <Box p={2} textAlign="center">
          <div
            style={{
              maxHeight: "20%",
              maxWidth: "128px",
              margin: "0 auto",
            }}
          >
            <ImpromatLogoComponent></ImpromatLogoComponent>
          </div>
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            {t("sign in to access impromat")}
          </Typography>

          <LoginSection />

          <Button
            sx={{ mt: 1 }}
            component={Link}
            to={routeHome()}
            variant="outlined"
            startIcon={<Info />}
          >
            {t("learnMore")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
