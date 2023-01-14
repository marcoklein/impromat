import { useIonToast } from "@ionic/react";
import { enableAutoLogin } from "../database/enable-auto-login";
import { useComponentLogger } from "./use-component-logger";
import { useGoogleLoginHref } from "./use-google-login-href";
import { useImpromatRxDb } from "./use-impromat-rx-db";

export function useGoogleLogin() {
  const [displayToast] = useIonToast();
  const database = useImpromatRxDb();
  const logger = useComponentLogger("useLogin");
  const { googleLoginHref } = useGoogleLoginHref();

  const loginClick = () => {
    logger("loginClick");
    if (!googleLoginHref) {
      displayToast(
        "Please check your internet connection or retry in two minutes.",
        2000,
      );
      return;
    }
    if (process.env.REACT_APP_AUTO_LOGIN) {
      enableAutoLogin(database, true);
    } else {
      window.location.href = googleLoginHref;
    }
  };

  return loginClick;
}
