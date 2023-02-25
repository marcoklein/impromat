import { useEffect, useState } from "react";
import { environment } from "../environment";
import { useComponentLogger } from "./use-component-logger";

const backendUrl = `${environment.API_URL}/graphql`;
export function useGoogleLoginHref() {
  const [googleLoginHref, setGoogleLoginHref] = useState<string | undefined>(
    undefined,
  );
  const [isGoogleLoginHrefFetching, setIsGoogleLoginHrefFetching] =
    useState(true);
  const logger = useComponentLogger("useGoogleLoginHref");
  useEffect(() => {
    (async () => {
      logger("sending googleAuthRequest");

      try {
        const response = await fetch(backendUrl, {
          method: "POST",
          body: JSON.stringify({
            query: /* GraphQL */ `
              {
                googleAuthUrl
              }
            `,
          }),
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          credentials: "include",
        });
        const json = await response.json();
        setGoogleLoginHref(json.data.googleAuthUrl);
        logger("Set googleLoginHref to %s", json.data.googleAuthUrl);
      } catch (e) {
        logger("error while sending request: %o", e);
        console.warn(e);
        if (process.env.REACT_APP_AUTO_LOGIN) {
          console.warn(
            "REACT_APP_AUTO_LOGIN: skip validation of google auth request",
          );
          setGoogleLoginHref("react-app-auto-login");
        }
      }
      setIsGoogleLoginHrefFetching(false);
      logger("GoogleLoginHref fetching is done");
    })();
  }, [logger]);

  return { googleLoginHref, isGoogleLoginHrefFetching };
}
