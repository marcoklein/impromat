import {
  IonButton,
  IonCardSubtitle,
  IonIcon,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import { Box } from "@mui/material";
import { arrowForwardOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { ImpromatHero } from "../components/ImpromatHero";
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
      <ImpromatHero>
        <IonText color="dark">
          <IonCardSubtitle>
            {t(
              "App for planning, giving and sharing improvisational theatre workshops.",
            )}
          </IonCardSubtitle>
        </IonText>
        {!isLoggedIn && (
          <IonButton routerLink={routeLibrary()} className="ion-margin-top">
            <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
            {t("Access Impromat")}
          </IonButton>
        )}
      </ImpromatHero>
      <div className="ion-padding">
        <HomeContent></HomeContent>
      </div>
      <IonList>
        <IonItem routerLink={routeLegal()}>{t("Legal Notice")}</IonItem>
        <IonItem routerLink={routePrivacyPolicy()}>
          {t("Privacy Policy", { ns: "common" })}
        </IonItem>
      </IonList>
    </Box>
  );
};
