import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { arrowForwardOutline, information } from "ionicons/icons";
import { Trans, useTranslation } from "react-i18next";
import { routeLibrary } from "../../routes/library-routes";
import {
  routeAbout,
  routePrivacyPolicy,
  routeWorkshops,
} from "../../routes/shared-routes";

export const HomeContent: React.FC = () => {
  const { t } = useTranslation("HomeContent");
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "900px" }} className="ion-margin-top">
          <IonText color="dark">
            <h1>{t("Improving Improv")}</h1>
          </IonText>
          <IonText color="dark" className="ion-margin-bottom">
            <Trans
              t={t}
              i18nKey="madeForImprovisers"
              components={{ b: <b></b> }}
            ></Trans>
          </IonText>
          <IonCard style={{ marginLeft: 0, marginRight: 0 }}>
            <IonCardHeader>
              <IonCardTitle>
                <h3 style={{ margin: 0 }}>{t("Exercises-Games")}</h3>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
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

              <IonButton
                className="ion-margin-top"
                fill="solid"
                color="secondary"
                routerLink={routeLibrary()}
              >
                <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
                {t("GoToElements")}
              </IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard style={{ marginLeft: 0, marginRight: 0 }}>
            <IonCardHeader>
              <IonCardTitle>
                <h3 style={{ margin: 0 }}>{t("Improv Workshops")}</h3>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                <Trans
                  t={t}
                  i18nKey="ImprovWorkshops_1"
                  components={{ b: <b></b> }}
                ></Trans>
              </p>
              <IonButton
                fill="solid"
                routerLink={routeWorkshops()}
                className="ion-margin-vertical"
              >
                <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
                {t("CreateWorkshop")}
              </IonButton>
              <p>
                <Trans
                  t={t}
                  i18nKey="ImprovWorkshops_2"
                  components={{ b: <b></b> }}
                ></Trans>
              </p>
              {/* <p>
                  
                </p> */}
            </IonCardContent>
          </IonCard>

          <IonCard style={{ marginLeft: 0, marginRight: 0 }}>
            <IonCardHeader>
              <IonCardTitle>
                <h3 style={{ margin: 0 }}>{t("Customize Your Improv")}</h3>
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                <Trans
                  t={t}
                  i18nKey={"CustomizeImprov_1"}
                  components={{ b: <b></b> }}
                ></Trans>
              </p>
              <IonButton
                className="ion-margin-vertical"
                fill="solid"
                color="tertiary"
                routerLink={routeLibrary()}
              >
                <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
                {t("Open Liked Elements")}
              </IonButton>
              <p>
                <Trans
                  t={t}
                  i18nKey="CustomizeImprov_2"
                  components={{
                    b: <b></b>,
                    privacyPolicyLink: (
                      <IonRouterLink
                        routerLink={routePrivacyPolicy()}
                      ></IonRouterLink>
                    ),
                  }}
                ></Trans>
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: "900px" }} className="ion-margin-top">
          <IonText>
            <h1>{t("MadeForImprovisers")}</h1>
          </IonText>
          <p>
            <IonText color="dark">
              <Trans
                t={t}
                i18nKey={"ImproviserText"}
                components={{ b: <b></b> }}
              ></Trans>
            </IonText>
          </p>
          <IonButton routerLink={routeWorkshops()}>
            <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
            {t("TryItOut")}
          </IonButton>
          <IonText color="dark">
            <h3>{t("ImprovBeginners")}</h3>
          </IonText>
          <IonText color="dark">
            <p>
              <Trans
                t={t}
                i18nKey={"BeginnerText"}
                components={{ b: <b></b> }}
              ></Trans>
            </p>
          </IonText>
          <IonText color="dark">
            <h3>{t("EstablishedGroups")}</h3>
          </IonText>
          <IonText color="dark">
            <p>
              <Trans
                t={t}
                i18nKey={"GroupText"}
                components={{ b: <b></b>, br: <br></br> }}
              ></Trans>
            </p>
          </IonText>
          <IonText color="dark">
            <h3>{t("WorkshopLeaders")}</h3>
          </IonText>
          <IonText color="dark">
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
          </IonText>
          <IonButton fill="solid" routerLink={routeWorkshops()}>
            <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
            {t("OpenWorkshops")}
          </IonButton>

          <IonText color="dark">
            <h1>{t("YouWantMore")}</h1>
          </IonText>
          <IonText color="dark">
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
          </IonText>
          <IonButton fill="outline" routerLink={routeAbout()}>
            <IonIcon slot="start" icon={information}></IonIcon>
            {t("AboutProject")}
          </IonButton>
        </div>
      </div>
    </>
  );
};
