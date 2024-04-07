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
import { Steps } from "intro.js-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ImpromatHero } from "../../components/ImpromatHero";
import { environment } from "../../environment";
import { useIsLoggedIn } from "../../hooks/use-is-logged-in";
import {
  routeLegal,
  routeLibrary,
  routePrivacyPolicy,
} from "../../routes/shared-routes";
import { HomeContent } from "./HomeContent";

export const HomePage: React.FC = () => {
  const { t } = useTranslation("HomePage");
  const { isLoggedIn } = useIsLoggedIn();

  // TODO put steps into separate component
  const [stepsEnabled, setStepsEnabled] = useState(false);
  // enable steps after 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStepsEnabled(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
          // TODO add two cards with "Why are you here?"
          // either choose search elements or search workshops
          // start a story with either of them
        )}
      </ImpromatHero>
      <Box p={2}>
        <HomeContent></HomeContent>
      </Box>
      <Container maxWidth="md" sx={{ p: 0 }}>
        <List>
          <ListItemButton component={NavLink} to={routeLegal()} data-intro="12">
            <Typography>{t("Legal Notice")}</Typography>
          </ListItemButton>
          <ListItemButton component={NavLink} to={routePrivacyPolicy()}>
            <Typography>{t("Privacy Policy", { ns: "common" })}</Typography>
          </ListItemButton>
          <ListItem>
            <Typography variant="caption">v{environment.VERSION}</Typography>
          </ListItem>
        </List>
      </Container>
      {/* Activation 1: A user wants to browse exercises and games. */}
      <Steps
        enabled={stepsEnabled}
        initialStep={0}
        steps={[
          {
            element: "#RootNavigationELEMENTS",
            title: "Search for Elements",
            intro: "Click on the search tab to search for elements.",
          },
          {
            element: "#ElementSearchInput",
            title: "Input Search",
            intro:
              "Type in a search term. For example, try 'freeze' or 'accepting'.",
          },
        ]}
        onExit={() => {
          setStepsEnabled(false);
        }}
      ></Steps>
    </Box>
  );
};
