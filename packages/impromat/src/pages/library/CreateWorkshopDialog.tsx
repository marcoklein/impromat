import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogScaffold } from "../../components/DialogScaffold";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useCreateWorkshopMutation } from "../../hooks/use-create-workshop-mutation";

interface ContainerProps {
  open: boolean;
  handleClose: () => void;
}

export const CreateWorkshopDialog: React.FC<ContainerProps> = ({
  open,
  handleClose,
}) => {
  // TODO update translations
  const { t } = useTranslation("CreateWorkshopDialog");
  const logger = useComponentLogger("CreateWorkshopDialog");

  const [name, setName] = useState("");

  const [createWorkshopMutationResult, createWorkshopMutation] =
    useCreateWorkshopMutation();

  const handleCreateWorkshop = useCallback(async () => {
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
  }, [
    createWorkshopMutation,
    createWorkshopMutationResult,
    handleClose,
    logger,
    name,
  ]);

  return (
    <DialogScaffold
      open={open}
      handleClose={handleClose}
      title={t("workshopDialogTitle")}
    >
      <DialogTitle component="h4" sx={{ m: 0, py: 0 }} variant="body1">
        {t("nameMessage")}
      </DialogTitle>
      <DialogContent>
        <TextField
          required
          autoFocus
          fullWidth
          margin="dense"
          placeholder={t("namePlaceholder")}
          type="text"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => handleCreateWorkshop()}
        >
          {t("create")}
        </Button>
      </DialogActions>
    </DialogScaffold>
  );
};
