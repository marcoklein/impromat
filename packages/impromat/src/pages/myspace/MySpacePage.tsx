import { Logout } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Avvvatars from "avvvatars-react";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { PageScaffold } from "../../components/PageScaffold";
import { ElementsIcon } from "../../components/icons/ElementsIcon";
import { WorkshopsIcon } from "../../components/icons/WorkshopsIcon";
import { graphql } from "../../graphql-client";
import { useLogoutMutation } from "../../hooks/use-logout-mutation";
import { routeLibrary, routeWorkshops } from "../../routes/shared-routes";
import { LanguageSelect } from "./LanguageSelect";
import { UserNameTextField } from "./UserNameTextField";

const MySpacePage_Query = graphql(`
  query MySpacePage_Query {
    me {
      id
      name
      languageCodes
    }
  }
`);

export const MySpacePage: React.FC = () => {
  const { t } = useTranslation("MySpacePage");

  const [queryResult] = useQuery({
    query: MySpacePage_Query,
    variables: {},
  });
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const onLogoutDialogClose = useCallback(
    () => setIsLogoutDialogOpen(false),
    [setIsLogoutDialogOpen],
  );
  const [, logoutMutation] = useLogoutMutation();
  const onLogout = useCallback(() => {
    logoutMutation({});
  }, [logoutMutation]);

  const queryUserName = useMemo(
    () => queryResult.data?.me?.name ?? "",
    [queryResult.data?.me?.name],
  );
  const userId = useMemo(
    () => queryResult.data?.me?.id,
    [queryResult.data?.me?.id],
  );

  if (!userId) {
    return <Typography>No user id</Typography>;
  }

  return (
    <PageScaffold
      title={t("title")}
      buttons={
        <>
          <IconButton
            color="inherit"
            onClick={() => setIsLogoutDialogOpen(true)}
            aria-label={t("Logout")}
          >
            <Logout />
          </IconButton>
          <Dialog
            open={isLogoutDialogOpen}
            onClose={onLogoutDialogClose}
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">{t("Logout")}</DialogTitle>
            <DialogContent>
              <Typography>{t("LogoutMessage")}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={onLogoutDialogClose} autoFocus>
                {t("Cancel", { ns: "common" })}
              </Button>
              <Button onClick={onLogout}>{t("Logout")}</Button>
            </DialogActions>
          </Dialog>
        </>
      }
    >
      <Box sx={{ overflow: "auto" }}>
        <Container maxWidth="sm" sx={{ height: "100%", p: 0 }}>
          <Typography variant="h6" component="div" sx={{ pt: 1, pl: 1 }}>
            {t("profile")}
          </Typography>
          <List sx={{ pt: 0 }}>
            <ListItem sx={{ pt: 0 }}>
              <ListItemIcon>
                {/* eslint-disable-next-line react/style-prop-object */}
                <Avvvatars value={queryUserName} size={40} style="shape" />
              </ListItemIcon>
              <UserNameTextField
                queryUserName={queryUserName}
                readonly={
                  !queryResult.data?.me?.id ||
                  queryResult.fetching ||
                  queryResult.stale
                }
                userId={userId}
              />
            </ListItem>
            <LanguageSelect
              userId={userId}
              selectedLanguageCode={queryResult.data?.me?.languageCodes?.at(0)}
              languageCodes={queryResult.data?.me?.languageCodes ?? []}
              availableLanguageCodes={["en", "de"]}
            />
          </List>

          <Typography variant="h6" component="div" sx={{ px: 1, pt: 1 }}>
            {t("Creations")}
          </Typography>
          <List>
            <ListItemButton component={Link} to={routeLibrary("@me")}>
              <ListItemIcon>
                <ElementsIcon />
              </ListItemIcon>
              <ListItemText color="inherit">{t("My Elements")}</ListItemText>
            </ListItemButton>
            <ListItemButton component={Link} to={routeWorkshops()}>
              <ListItemIcon>
                <WorkshopsIcon />
              </ListItemIcon>
              <ListItemText color="inherit">{t("My Workshops")}</ListItemText>
            </ListItemButton>
          </List>
        </Container>
      </Box>
    </PageScaffold>
  );
};
