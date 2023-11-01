import {
  IonButton,
  IonCardSubtitle,
  IonIcon,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { ImpromatHero } from "../components/ImpromatHero";
import { PageScaffold } from "../components/PageScaffold";
import { useIsLoggedIn } from "../hooks/use-is-logged-in";
import {
  routeAbout,
  routeAccount,
  routeLegal,
  routePrivacyPolicy,
  routeWorkshops,
} from "../routes/shared-routes";
import { HomeContent } from "./home/HomeContent";

export const HomePage: React.FC = () => {
  const { isLoggedIn } = useIsLoggedIn();

  const { t } = useTranslation("HomePage");

  return (
    <PageScaffold noHeader>
      <ImpromatHero>
        <IonText color="dark">
          <IonCardSubtitle>
            {t(
              "App for planning, giving and sharing improvisational theatre workshops.",
            )}
          </IonCardSubtitle>
        </IonText>
        {!isLoggedIn && (
          <IonButton routerLink={routeWorkshops()} className="ion-margin-top">
            <IonIcon slot="start" icon={arrowForwardOutline}></IonIcon>
            {t("Access Impromat")}
          </IonButton>
        )}
      </ImpromatHero>
      {!isLoggedIn && (
        <div className="ion-padding">
          <HomeContent></HomeContent>
        </div>
      )}

      <IonList>
        <IonItem routerLink={routeAccount()}>{t("Profile")}</IonItem>
        <IonItem routerLink={routeAbout()}>{t("About the Project")}</IonItem>
        <IonItem routerLink={routeLegal()}>{t("Legal Notice")}</IonItem>
        <IonItem routerLink={routePrivacyPolicy()}>
          {t("Privacy Policy", { ns: "common" })}
        </IonItem>
      </IonList>

      {isLoggedIn && (
        <div className="ion-padding">
          <HomeContent></HomeContent>
        </div>
      )}
    </PageScaffold>
  );
};
