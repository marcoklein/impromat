import { SentimentVeryDissatisfied } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { FallbackProps } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import { PageScaffold } from "../components/PageScaffold";

export const ErrorFallbackPage: React.FC<FallbackProps> = ({ error }) => {
  const { t } = useTranslation("ErrorFallbackPage");
  return (
    <PageScaffold title={t("Error")}>
      <Box
        sx={{
          p: 2,
          width: "100%",
          height: "100%",
          backgroundImage: "url(assets/error.jpg)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <Card>
          <CardHeader
            title={t("OhNo")}
            avatar={
              <IconButton>
                <SentimentVeryDissatisfied />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {t("ErrorMessage")} {error.message}
            </Typography>
          </CardContent>
          <CardContent>
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
            >
              {t("ReloadPage")}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </PageScaffold>
  );
};
