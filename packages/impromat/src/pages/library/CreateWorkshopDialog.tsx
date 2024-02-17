import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useCreateWorkshopMutation } from "../../hooks/use-create-workshop-mutation";
import { routeWorkshop } from "../../routes/shared-routes";
import { TextFieldDialog } from "../workshop/components/TextFieldDialog";

interface ContainerProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateWorkshopDialog: React.FC<ContainerProps> = ({
  open,
  handleClose,
}) => {
  const { t } = useTranslation("CreateWorkshopDialog");
  const logger = useComponentLogger("CreateWorkshopDialog");
  const history = useHistory();

  const [createWorkshopMutationResult, createWorkshopMutation] =
    useCreateWorkshopMutation();

  const handleCreateWorkshop = useCallback(
    async (name: string) => {
      logger("Creating new workshop with name %s", name);
      const { error, data } = await createWorkshopMutation({
        input: { name },
      });
      logger("createWorkshopMutationResult", createWorkshopMutationResult);
      const id = data?.createWorkshop.id;
      if (error || !id) {
        return;
      }
      logger("Added new workshop with id %s", id);
      handleClose();
      history.push(routeWorkshop(id));
    },
    [
      createWorkshopMutation,
      createWorkshopMutationResult,
      handleClose,
      history,
      logger,
    ],
  );

  return (
    <TextFieldDialog
      handleClose={handleClose}
      open={open}
      title={t("workshopDialogTitle")}
      handleSave={handleCreateWorkshop}
      saveText={t("create")}
      TextFieldProps={{
        placeholder: t("namePlaceholder"),
      }}
    />
  );
};
