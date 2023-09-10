import { IonButton } from "@ionic/react";
import { routeRootNavigation } from "../routes/shared-routes";

/**
 * Purpose of the landing/home page is to provide a quick overview of the app and inform the user about all available features.
 * The user needs to sign in to use the app. Therefore, it should only point to the sign in page.
 */
export const NotFoundPage: React.FC = () => {
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
        <h1>Uups, this page does not exist.</h1>
        <IonButton routerLink={routeRootNavigation()} expand="full">
          Go to home page
        </IonButton>
      </div>
    </div>
  );
};
