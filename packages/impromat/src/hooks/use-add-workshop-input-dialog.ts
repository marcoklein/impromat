import { useCallback } from "react";
import { useHistory } from "react-router";
import { routeWorkshop } from "../routes/shared-routes";
import { useCreateWorkshopMutation } from "./use-create-workshop-mutation";
import { useInputDialog } from "./use-input-dialog";
import { useLogger } from "./use-logger";
import { useTranslation } from "react-i18next";

export function useCreateWorkshopInputDialog() {
  const [presentInputDialog] = useInputDialog();
  const [, createWorkshopMutation] = useCreateWorkshopMutation();
  const logger = useLogger("useCreateWorkshopInputDialog");
  const history = useHistory();
  const { t } = useTranslation("use-add-workshop-input-dialog");

  const presentWorkshopInputDialog = useCallback(() => {
    presentInputDialog({
      header: t("WorkshopName"),
      message: t("NameMessage"),
      placeholder: t("NamePlaceholder"),
      buttonText: t("Create"),
      emptyInputMessage: t("EmptyNameMessage"),
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
  }, [presentInputDialog, t, createWorkshopMutation, logger, history]);

  return presentWorkshopInputDialog;
}
