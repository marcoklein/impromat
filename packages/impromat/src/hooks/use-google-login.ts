import { useComponentLogger } from "./use-component-logger";
import { useGoogleLoginHref } from "./use-google-login-href";

export function useGoogleLogin(pathAfterLogin?: string) {
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
    // state is passed to the google login page and then passed back to the app
    const stateObject = {
      pathAfterLogin: pathAfterLogin ?? window.location.pathname,
    };
    const encodedState = encodeURIComponent(JSON.stringify(stateObject));
    const loginWithState = googleLoginHref + "&state=" + encodedState;
    window.location.href = loginWithState;
    return loginWithState;
  };

  return loginClick;
}
