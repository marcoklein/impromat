import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GoogleSignInButton } from "../../components/GoogleSignInButton";
import { useGoogleLogin } from "../../hooks/use-google-login";
import { routePrivacyPolicy } from "../../routes/shared-routes";

export const LoginSection: React.FC = () => {
  const { t } = useTranslation("LoginSection");
  const googleLogin = useGoogleLogin();

  return (
    <>
      <Box m={1}>
        <GoogleSignInButton onClick={() => googleLogin()}></GoogleSignInButton>
      </Box>

      <Typography variant="body2" component="div" color="text.secondary">
        <Trans
          t={t}
          i18nKey="agreeToPrivacyPolicy"
          components={{
            PrivacyPolicyLink: (
              <Link to={routePrivacyPolicy()}>placeholder</Link>
            ),
          }}
        />
      </Typography>
    </>
  );
};
