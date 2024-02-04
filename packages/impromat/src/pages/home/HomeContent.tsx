import { ArrowForward, Info } from "@mui/icons-material";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "900px" }} className="ion-margin-top">
          <Typography variant="h4" component="h2">
            {t("Improving Improv")}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <Trans
              t={t}
              i18nKey="madeForImprovisers"
              components={{ b: <b></b> }}
            ></Trans>
          </Typography>
          <Stack spacing={2}>
            <Card style={{ marginLeft: 0, marginRight: 0 }}>
              <CardContent>
                <Typography component="h3" variant="h5">
                  {t("Exercises-Games")}
                </Typography>
                <p>
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
                </p>

                <Button
                  className="ion-margin-top"
                  variant="contained"
                  color="secondary"
                  component={NavLink}
                  to={routeLibrary()}
                  startIcon={<ArrowForward />}
                >
                  {t("GoToElements")}
                </Button>
              </CardContent>
            </Card>
            <Card style={{ marginLeft: 0, marginRight: 0 }}>
              <CardContent>
                <Typography component="h3" variant="h5">
                  {t("Improv Workshops")}
                </Typography>
                <p>
                  <Trans
                    t={t}
                    i18nKey="ImprovWorkshops_1"
                    components={{ b: <b></b> }}
                  ></Trans>
                </p>
                <Button
                  variant="contained"
                  component={NavLink}
                  to={routeWorkshops()}
                  className="ion-margin-vertical"
                  startIcon={<ArrowForward />}
                >
                  {t("CreateWorkshop")}
                </Button>
                <p>
                  <Trans
                    t={t}
                    i18nKey="ImprovWorkshops_2"
                    components={{ b: <b></b> }}
                  ></Trans>
                </p>
              </CardContent>
            </Card>

            <Card style={{ marginLeft: 0, marginRight: 0 }}>
              <CardContent>
                <Typography component="h3" variant="h5">
                  {t("Customize Your Improv")}
                </Typography>
                <p>
                  <Trans
                    t={t}
                    i18nKey={"CustomizeImprov_1"}
                    components={{ b: <b></b> }}
                  ></Trans>
                </p>
                <Button
                  className="ion-margin-vertical"
                  variant="contained"
                  color="primary"
                  component={NavLink}
                  to={routeLibrary()}
                  startIcon={<ArrowForward />}
                >
                  {t("Open Liked Elements")}
                </Button>
                <p>
                  <Trans
                    t={t}
                    i18nKey="CustomizeImprov_2"
                    components={{
                      b: <b></b>,
                      privacyPolicyLink: <NavLink to={routePrivacyPolicy()} />,
                    }}
                  ></Trans>
                </p>
              </CardContent>
            </Card>
          </Stack>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "900px" }} className="ion-margin-top">
          <Typography>
            <h1>{t("MadeForImprovisers")}</h1>
          </Typography>
          <p>
            <Typography color="textPrimary">
              <Trans
                t={t}
                i18nKey={"ImproviserText"}
                components={{ b: <b></b> }}
              ></Trans>
            </Typography>
          </p>
          <Button
            variant="contained"
            component={NavLink}
            to={routeWorkshops()}
            startIcon={<ArrowForward />}
          >
            {t("TryItOut")}
          </Button>
          <Typography color="textPrimary">
            <h3>{t("ImprovBeginners")}</h3>
          </Typography>
          <Typography color="textPrimary">
            <p>
              <Trans
                t={t}
                i18nKey={"BeginnerText"}
                components={{ b: <b></b> }}
              ></Trans>
            </p>
          </Typography>
          <Typography color="textPrimary">
            <h3>{t("EstablishedGroups")}</h3>
          </Typography>
          <Typography color="textPrimary">
            <p>
              <Trans
                t={t}
                i18nKey={"GroupText"}
                components={{ b: <b></b>, br: <br></br> }}
              ></Trans>
            </p>
          </Typography>
          <Typography color="textPrimary">
            <h3>{t("WorkshopLeaders")}</h3>
          </Typography>
          <Typography color="textPrimary">
            <p>
              <Trans
                t={t}
                i18nKey={"LeaderText"}
                components={{ b: <b></b> }}
              ></Trans>
            </p>
            <p>
              <b>{t("ImprovTool")}</b>
            </p>
          </Typography>
          <Button
            variant="contained"
            component={NavLink}
            to={routeWorkshops()}
            startIcon={<ArrowForward />}
          >
            {t("OpenWorkshops")}
          </Button>

          <Typography color="textPrimary">
            <h1>{t("YouWantMore")}</h1>
          </Typography>
          <Typography color="textPrimary">
            <p>
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
            </p>
            <p></p>
          </Typography>
          <Button
            variant="outlined"
            component={NavLink}
            to={routeAbout()}
            startIcon={<Info />}
          >
            {t("AboutProject")}
          </Button>
        </div>
      </div>
    </>
  );
};
