import { ArrowForwardOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ImpromatHero } from "../components/ImpromatHero";
import { environment } from "../environment";
import { useIsLoggedIn } from "../hooks/use-is-logged-in";
import {
  routeLegal,
  routeLibrary,
  routePrivacyPolicy,
} from "../routes/shared-routes";
import { HomeContent } from "./home/HomeContent";

export const HomePage: React.FC = () => {
  const { isLoggedIn } = useIsLoggedIn();

  const { t } = useTranslation("HomePage");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        position: "relative",
        pt: 5,
      }}
    >
      <ImpromatHero
        subtitle={t(
          "App for planning, giving and sharing improvisational theatre workshops.",
        )}
      >
        {!isLoggedIn && (
          <Button
            variant="contained"
            component={NavLink}
            to={routeLibrary()}
            startIcon={<ArrowForwardOutlined />}
            sx={{ mt: 2 }}
          >
            {t("accessImpromat")}
          </Button>
        )}
      </ImpromatHero>
      <Box p={2}>
        <HomeContent></HomeContent>
      </Box>
      <Container maxWidth="md" sx={{ p: 0 }}>
        <List>
          <ListItemButton component={NavLink} to={routeLegal()}>
            {t("Legal Notice")}
          </ListItemButton>
          <ListItemButton component={NavLink} to={routePrivacyPolicy()}>
            {t("Privacy Policy", { ns: "common" })}
          </ListItemButton>
          <ListItem>
            <Typography variant="caption">v{environment.VERSION}</Typography>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};
