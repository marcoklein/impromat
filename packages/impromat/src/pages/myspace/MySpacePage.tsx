import Logout from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "boring-avatars";
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
                {queryUserName.length > 0 && (
                  <Avatar name={queryUserName} size={40} variant={"beam"} />
                )}
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
