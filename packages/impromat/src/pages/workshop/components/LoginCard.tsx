import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import { LoginSection } from "../../login/LoginSection";

export const LoginCard: React.FC = () => {
  const { t } = useTranslation("LoginCard");

  return (
    <Card
      sx={{
        m: 2,
        // bgcolor: "primary.main",
        // color: "primary.contrastText",
        borderColor: "primary.main",
        borderWidth: 2,
        borderStyle: "solid",
        textAlign: "center",
      }}
      elevation={8}
    >
      <CardContent>
        <Typography variant="h5">{t("title")}</Typography>
        <Typography variant="body1" color="text.secondary">
          {t("subtitle")}
        </Typography>
        <Box>
          <LoginSection />
        </Box>
      </CardContent>
    </Card>
  );
};
