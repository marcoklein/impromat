import { useIonToast } from "@ionic/react";
import { useComponentLogger } from "./use-component-logger";
import { useGoogleLoginHref } from "./use-google-login-href";

export function useGoogleLogin() {
  const [displayToast] = useIonToast();
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
    window.location.href = googleLoginHref;
  };

  return loginClick;
}
