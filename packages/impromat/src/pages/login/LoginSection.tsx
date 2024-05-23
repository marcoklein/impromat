import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { GoogleSignInButton } from "../../components/GoogleSignInButton";
import { useGoogleLogin } from "../../hooks/use-google-login";
import { routePrivacyPolicy } from "../../routes/shared-routes";

interface ComponentProps {
  pathAfterLogin?: string;
}

export const LoginSection: React.FC<ComponentProps> = ({ pathAfterLogin }) => {
  const { t } = useTranslation("LoginSection");
  const googleLogin = useGoogleLogin(pathAfterLogin);

  return (
    <>
      <Box my={1}>
        <GoogleSignInButton onClick={() => googleLogin()}></GoogleSignInButton>
      </Box>

      <Typography variant="body2" component="div" color="text.secondary">
        <Trans
          t={t}
          i18nKey="agreeToPrivacyPolicy"
          components={{
            PrivacyPolicyLink: (
              // TODO show privacy policy as dialog
              <Link to={routePrivacyPolicy()}>placeholder</Link>
            ),
          }}
        />
      </Typography>
    </>
  );
};
