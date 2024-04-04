import { useComponentLogger } from "./use-component-logger";
import { useGoogleLoginHref } from "./use-google-login-href";

export function useGoogleLogin() {
  const logger = useComponentLogger("useLogin");
  const { googleLoginHref } = useGoogleLoginHref();

  const loginClick = () => {
    logger("loginClick");
    if (!googleLoginHref) {
      console.warn("googleLoginHref is undefined");
      logger("googleLoginHref is undefined");
      return undefined;
    }
    logger("redirecting to google login page");
    window.location.href = googleLoginHref;
    return googleLoginHref;
  };

  return loginClick;
}
