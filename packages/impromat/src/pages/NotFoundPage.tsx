import { IonButton } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useComponentLogger } from "../hooks/use-component-logger";
import { routeRootNavigation } from "../routes/shared-routes";

/**
 * Purpose of the landing/home page is to provide a quick overview of the app and inform the user about all available features.
 * The user needs to sign in to use the app. Therefore, it should only point to the sign in page.
 */
export const NotFoundPage: React.FC = () => {
  useComponentLogger("NotFoundPage");
  const { t } = useTranslation("NotFoundPage");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1>{t("Page does not exist")}</h1>
        <IonButton routerLink={routeRootNavigation()} expand="full">
          {t("Go to home page")}
        </IonButton>
      </div>
    </div>
  );
};
