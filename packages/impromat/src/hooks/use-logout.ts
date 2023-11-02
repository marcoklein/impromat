import { useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useCallback } from "react";
import { useMutation } from "urql";
import { APP_LOCAL_STORAGE_PREFIX } from "../app-local-storage-prefix";
import { clearLocalStorageWithPrefix } from "../functions/clear-local-storage";
import { graphql } from "../graphql-client";
import { useIsLoggedIn } from "./use-is-logged-in";
import { useLogger } from "./use-logger";

export function useLogout() {
  const [presentIonLoading, dismissIonLoading] = useIonLoading();
  const [displayToast] = useIonToast();
  const logger = useLogger("useLogout");
  const [presentAlert] = useIonAlert();
  const { isLoggedIn, retriggerLogInQuery } = useIsLoggedIn();

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
    }
  }, [
    dismissIonLoading,
    displayToast,
    logger,
    logoutMutation,
    presentIonLoading,
    retriggerLogInQuery,
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
      header: "Logout",
      message:
        "Are you sure you want to log out? All data on this device will be deleted.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Logout",
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
