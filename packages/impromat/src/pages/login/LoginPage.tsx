import { Info } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GoogleSignInButton } from "../../components/GoogleSignInButton";
import { ImpromatLogoComponent } from "../../components/ImpromatLogoComponent";
import { useGoogleLogin } from "../../hooks/use-google-login";
import { routeHome, routePrivacyPolicy } from "../../routes/shared-routes";

export const LoginPage: React.FC = () => {
  const { t } = useTranslation("LoginPage");

  const googleLogin = useGoogleLogin();
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

          <Box m={1}>
            <GoogleSignInButton
              onClick={() => googleLogin()}
            ></GoogleSignInButton>
          </Box>

          <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
            <Trans
              t={t}
              i18nKey="agree to privacy policy"
              components={{
                PrivacyPolicyLink: (
                  <Link to={routePrivacyPolicy()}>placeholder</Link>
                ),
              }}
            />
          </Typography>
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
