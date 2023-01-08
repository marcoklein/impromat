import { ToastButton, useIonToast } from "@ionic/react";
import { close } from "ionicons/icons";
import { useContext, useEffect } from "react";
import { fetchImprovElements } from "../../functions/fetch-improv-elements";
import { mapImprovElementToWorkshopElement } from "../../functions/map-improv-element-to-workshop-element";
import { useLogger } from "../../hooks/use-logger";
import { ImprovLibraryContext } from "./improv-library-context";

export function useImprobibElements() {
  const { improvElements, setImprovElements } =
    useContext(ImprovLibraryContext);
  const logger = useLogger("useImprobibElements");
  const [dispatchToast] = useIonToast();

  useEffect(() => {
    if (!improvElements) {
      (async () => {
        try {
          const fetchedImprovElements = await fetchImprovElements();
          setImprovElements(
            fetchedImprovElements
              .filter((element) => element.type === "element")
              .map(mapImprovElementToWorkshopElement),
          );
        } catch (e) {
          logger("type %s", typeof e);
          const buttons: ToastButton[] = [
            {
              text: "Restart",
              handler: () => {
                window.location.reload();
              },
            },
            {
              role: "cancel",
              icon: close,
            },
          ];
          if (e instanceof Error) {
            logger(e.name);
            if (e.name === "SyntaxError") {
              dispatchToast({
                message:
                  "Could not load element library. Please restart the app.",
                color: "warning",
                buttons,
              });
              setImprovElements([]);
            } else if (
              e.name === "TypeError" &&
              e.message === "Failed to fetch"
            ) {
              dispatchToast({
                message:
                  "Failed to fetch element library. Please check your internet connection and restart the app.",
                color: "warning",
                buttons,
              });
              setImprovElements([]);
            }
          }
          logger("error", "useImprobibElements", "error", e);
          throw e;
        }
      })();
    }
  }, [improvElements, setImprovElements, logger, dispatchToast]);

  return improvElements;
}
