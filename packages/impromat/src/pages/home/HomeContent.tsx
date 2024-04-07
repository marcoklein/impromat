import { ArrowForward, Info } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  routeAbout,
  routeLibrary,
  routePrivacyPolicy,
  routeWorkshops,
} from "../../routes/shared-routes";

export const HomeContent: React.FC = () => {
  const { t } = useTranslation("HomeContent");
  return (
    <>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Box style={{ maxWidth: "900px" }} className="ion-margin-top">
          {/* TODO adjust style to match other application style. */}
          <Typography variant="h4" component="h2">
            {t("Improving Improv")}
          </Typography>
          <Typography sx={{ mb: 1 }} component="p">
            <Trans
              t={t}
              i18nKey="madeForImprovisers"
              components={{ b: <b></b> }}
            ></Trans>
          </Typography>
          <Stack spacing={2}>
            <Paper
              sx={{ p: 2, borderColor: "secondary.main" }}
              variant="outlined"
            >
              <Typography component="h3" variant="h5">
                {t("Exercises-Games")}
              </Typography>
              <Typography component="p">
                <Trans
                  t={t}
                  i18nKey="ImprovBibDescription"
                  components={{
                    b: <b></b>,
                    ImprowikiLink: (
                      <a
                        href="https://improwiki.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        placeholder
                      </a>
                    ),
                    LearnimprovLink: (
                      <a
                        href="https://www.learnimprov.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        placeholder
                      </a>
                    ),
                    ImprovRCLink: (
                      <a
                        href="https://wiki.improvresourcecenter.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        placeholder
                      </a>
                    ),
                  }}
                ></Trans>
              </Typography>

              <Button
                sx={{ mt: 1 }}
                className="ion-margin-top"
                variant="contained"
                color="secondary"
                component={NavLink}
                to={routeLibrary()}
                startIcon={<ArrowForward />}
              >
                {t("GoToElements")}
              </Button>
            </Paper>
            <Paper
              sx={{ p: 2, borderColor: "primary.main" }}
              variant="outlined"
            >
              <Typography component="h3" variant="h5">
                {t("Improv Workshops")}
              </Typography>
              <Typography component="p">
                <Trans
                  t={t}
                  i18nKey="ImprovWorkshops_1"
                  components={{ b: <b></b> }}
                ></Trans>
              </Typography>
              <Button
                sx={{ my: 1 }}
                variant="contained"
                component={NavLink}
                to={routeWorkshops()}
                className="ion-margin-vertical"
                startIcon={<ArrowForward />}
              >
                {t("CreateWorkshop")}
              </Button>
              <Typography component="p">
                <Trans
                  t={t}
                  i18nKey="ImprovWorkshops_2"
                  components={{ b: <b></b> }}
                ></Trans>
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, borderColor: "like.main" }} variant="outlined">
              <Typography component="h3" variant="h5">
                {t("Customize Your Improv")}
              </Typography>
              <Typography component="p">
                <Trans
                  t={t}
                  i18nKey={"CustomizeImprov_1"}
                  components={{ b: <b></b> }}
                ></Trans>
              </Typography>
              <Button
                sx={{ my: 1 }}
                className="ion-margin-vertical"
                variant="contained"
                color="like"
                component={NavLink}
                to={routeLibrary()}
                startIcon={<ArrowForward />}
              >
                {t("Open Liked Elements")}
              </Button>
              <Typography component="p">
                <Trans
                  t={t}
                  i18nKey="CustomizeImprov_2"
                  components={{
                    b: <b></b>,
                    privacyPolicyLink: <NavLink to={routePrivacyPolicy()} />,
                  }}
                ></Trans>
              </Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Box style={{ maxWidth: "900px" }} className="ion-margin-top">
          <Typography component="h2" variant="h3" mt={2}>
            {t("MadeForImprovisers")}
          </Typography>
          <Typography component="p" my={1}>
            <Typography color="textPrimary">
              <Trans
                t={t}
                i18nKey={"ImproviserText"}
                components={{ b: <b></b> }}
              ></Trans>
            </Typography>
          </Typography>
          <Button
            variant="contained"
            component={NavLink}
            to={routeWorkshops()}
            startIcon={<ArrowForward />}
          >
            {t("TryItOut")}
          </Button>
          <Typography color="textPrimary" component="h3" variant="h4" mt={2}>
            {t("ImprovBeginners")}
          </Typography>
          <Typography color="textPrimary" component="p" my={1}>
            <Trans
              t={t}
              i18nKey={"BeginnerText"}
              components={{ b: <b></b> }}
            ></Trans>
          </Typography>
          <Typography color="textPrimary" component="h3" variant="h4" mt={2}>
            {t("EstablishedGroups")}
          </Typography>
          <Typography color="textPrimary" component="p" my={1}>
            <Trans
              t={t}
              i18nKey={"GroupText"}
              components={{ b: <b></b>, br: <br></br> }}
            ></Trans>
          </Typography>
          <Typography color="textPrimary" component="h3" variant="h4" mt={2}>
            {t("WorkshopLeaders")}
          </Typography>
          <Typography color="textPrimary" component="p" my={1}>
            <Trans
              t={t}
              i18nKey={"LeaderText"}
              components={{ b: <b></b> }}
            ></Trans>
          </Typography>
          <Typography
            color="textPrimary"
            component="p"
            fontWeight="bold"
            my={1}
          >
            {t("ImprovTool")}
          </Typography>
          <Button
            variant="contained"
            component={NavLink}
            to={routeWorkshops()}
            startIcon={<ArrowForward />}
          >
            {t("OpenWorkshops")}
          </Button>

          <Typography color="textPrimary" component="h2" variant="h3" mt={2}>
            {t("YouWantMore")}
          </Typography>
          <Typography color="textPrimary" component="p" my={1}>
            <Trans
              t={t}
              i18nKey={"MoreText"}
              components={{
                b: <b></b>,
                br: <br></br>,
                MailadressLink: (
                  <a
                    href="mailto:impromat@marcoklein.dev"
                    target="_blank"
                    rel="noreferrer"
                  >
                    placeholder
                  </a>
                ),
              }}
            ></Trans>
          </Typography>
          <Button
            variant="outlined"
            component={NavLink}
            to={routeAbout()}
            startIcon={<Info />}
          >
            {t("AboutProject")}
          </Button>
        </Box>
      </Box>
    </>
  );
};
