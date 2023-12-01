import {
  useIonAlert,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "urql";
import { APP_LOCAL_STORAGE_PREFIX } from "../app-local-storage-prefix";
import { clearLocalStorageWithPrefix } from "../functions/clear-local-storage";
import { graphql } from "../graphql-client";
import { routeHome } from "../routes/shared-routes";
import { useIsLoggedIn } from "./use-is-logged-in";
import { useLogger } from "./use-logger";

export function useLogout() {
  const [presentIonLoading, dismissIonLoading] = useIonLoading();
  const [displayToast] = useIonToast();
  const logger = useLogger("useLogout");
  const [presentAlert] = useIonAlert();
  const { isLoggedIn, retriggerLogInQuery } = useIsLoggedIn();
  const router = useIonRouter();
  const { t } = useTranslation("use-logout");

  const [, logoutMutation] = useMutation(
    graphql(`
      mutation LogoutMutation {
        logout
      }
    `),
  );

  const startLogout = useCallback(async () => {
    presentIonLoading("Logging out...");
    const result = await logoutMutation({});
    if (result.error?.networkError) {
      displayToast(
        "An active internet connection is required for logout.",
        2000,
      );
    }
    retriggerLogInQuery();
    dismissIonLoading();
    if (result.data?.logout) {
      logger("Cleared all impromat prefixed localStorage keys");
      clearLocalStorageWithPrefix(APP_LOCAL_STORAGE_PREFIX);
      displayToast(t("You have been logged out"), 5000);
      router.push(routeHome());
      // router.push(routeLoggedOut());
    }
  }, [
    presentIonLoading,
    logoutMutation,
    retriggerLogInQuery,
    dismissIonLoading,
    displayToast,
    logger,
    t,
    router,
  ]);

  const triggerLogout = async (params?: { force: boolean }) => {
    if (!isLoggedIn) {
      logger("Will not log out because user is not logged in");
      return;
    }
    if (params?.force) {
      logger("Forced logout (no confirmation dialog)");
      startLogout();
      return;
    }
    presentAlert({
      header: t("Logout"),
      message: t("LogoutMessage"),
      buttons: [
        {
          text: t("Cancel", { ns: "common" }),
          role: "cancel",
          handler: () => {},
        },
        {
          text: t("Logout"),
          role: "confirm",
          handler: () => {
            startLogout();
          },
        },
      ],
    });
  };

  return { triggerLogout };
}
