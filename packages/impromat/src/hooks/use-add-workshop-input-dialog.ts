import { useCallback } from "react";
import { useHistory } from "react-router";
import { routeWorkshop } from "../routes/shared-routes";
import { useCreateWorkshopMutation } from "./use-create-workshop-mutation";
import { useInputDialog } from "./use-input-dialog";
import { useLogger } from "./use-logger";

export function useCreateWorkshopInputDialog() {
  const [presentInputDialog] = useInputDialog();
  const [, createWorkshopMutation] = useCreateWorkshopMutation();
  const logger = useLogger("useCreateWorkshopInputDialog");
  const history = useHistory();

  const presentWorkshopInputDialog = useCallback(() => {
    presentInputDialog({
      header: "Workshop Name",
      message: "Enter a name for your workshop. You can change it later:",
      placeholder: "Workshop name...",
      buttonText: "Create",
      emptyInputMessage: "Please enter a name for your workshop.",
      onAccept: async (text) => {
        const { error, data } = await createWorkshopMutation({
          input: { name: text },
        });
        const id = data?.createWorkshop.id;
        if (error || !id) {
          return;
        }
        logger("Adding new workshop with id %s", id);
        const navigateTo = routeWorkshop(id);
        history.replace(navigateTo);
        logger("Navigating to %s", navigateTo);
      },
    });
  }, [presentInputDialog, createWorkshopMutation, logger, history]);

  return presentWorkshopInputDialog;
}
