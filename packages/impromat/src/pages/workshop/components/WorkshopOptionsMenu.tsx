import ContentCopy from "@mui/icons-material/ContentCopy";
import Delete from "@mui/icons-material/Delete";
import Description from "@mui/icons-material/Description";
import Edit from "@mui/icons-material/Edit";
import Event from "@mui/icons-material/Event";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { DatePickerDialog } from "../../../components/DatePickerDialog";
import { ResponsiveOptions } from "../../../components/ResponsiveOptions";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useDeleteWorkshopMutation } from "../../../hooks/use-delete-workshop-mutation";
import { useDuplicateWorkshopMutation } from "../../../hooks/use-duplicate-workshop-mutation";
import { useUpdateWorkshopMutation } from "../../../hooks/use-update-workshop-mutation";
import { routeWorkshop, routeWorkshops } from "../../../routes/shared-routes";
import { ConfirmDialog } from "./ConfirmationDialog";
import { TextFieldDialog } from "./TextFieldDialog";

const WorkshopOptionsMenu_Workshop = graphql(`
  fragment WorkshopOptionsMenu_Workshop on Workshop {
    id
    name
    description
    dateOfWorkshop
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopOptionsMenu_Workshop>;
  goBackAfterDeletion?: boolean;
  isMenuOpen: boolean;
  onIsMenuOpenChange: (isOpen: boolean) => void;
  menuButtonRef: React.RefObject<HTMLElement>;
}

/**
 * Options menu for manipulating a Workshop.
 */
export const WorkshopOptionsMenu: React.FC<ContainerProps> = ({
  workshopFragment,
  goBackAfterDeletion,
  isMenuOpen,
  onIsMenuOpenChange,
  menuButtonRef,
}) => {
  const logger = useComponentLogger("WorkshopOptionsMenu");
  const workshop = getFragmentData(
    WorkshopOptionsMenu_Workshop,
    workshopFragment,
  );

  const history = useHistory();

  const [, deleteWorkshopMutation] = useDeleteWorkshopMutation();
  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();
  const [, duplicateWorkshopMutation] = useDuplicateWorkshopMutation();

  const [isWorkshopDeleteAlertOpen, setIsWorkshopDeleteAlertOpen] =
    useState(false);

  const changeWorkshopName = (newName: string) => {
    if (!workshop) return;
    updateWorkshopMutation({ input: { id: workshop.id, name: newName } });
  };
  const changeWorkshopDescription = (newDescription: string) => {
    if (!workshop) return;
    updateWorkshopMutation({
      input: { id: workshop.id, description: newDescription },
    });
  };
  const { t } = useTranslation("WorkshopOptionsMenu");

  const onDuplicateAndGotoWorkshop = async () => {
    if (!workshop) return;

    const { error, data } = await duplicateWorkshopMutation({
      input: {
        workshopId: workshop.id,
        name: `${workshop.name} ${t("duplicatePostfix")}`,
      },
    });
    const id = data?.duplicateWorkshop.id;
    if (error || !id) {
      return;
    }
    logger("Added new workshop with id %s", id);
    const navigateTo = routeWorkshop(id);
    logger("Navigating to %s", navigateTo);
    history.push(navigateTo);
  };

  const onDeleteWorkshop = async () => {
    logger("Deletion confirmed");
    deleteWorkshopMutation({ id: workshop.id }).then(() => {
      logger("Deleted workshop");
      if (goBackAfterDeletion) {
        history.push(routeWorkshops(), { direction: "back" });
      }
      setIsWorkshopDeleteAlertOpen(false);
    });
  };

  const onSaveWorkshopDate = async (date: string) => {
    logger("Setting date of workshop to %s", date);
    const { error } = await updateWorkshopMutation({
      input: {
        id: workshop.id,
        dateOfWorkshop: date.length ? date : null,
      },
    });
    if (error) {
      logger("Error setting date of workshop: %s", error.message);
      return;
    }
  };

  const [isChangeDescriptionDialogOpen, setIsChangeDescriptionDialogOpen] =
    useState(false);
  const [isRenameWorkshopDialogOpen, setIsRenameWorkshopDialogOpen] =
    useState(false);
  const [isSetWorkshopDateDialogOpen, setIsSetWorkshopDateDialogOpen] =
    useState(false);

  return (
    <>
      <ResponsiveOptions
        title={t("Options", { ns: "common" })}
        open={isMenuOpen}
        onOpenChange={onIsMenuOpenChange}
        menuButtonRef={menuButtonRef}
      >
        <List disablePadding>
          <ListItemButton
            onClick={() => {
              onIsMenuOpenChange(false);
              setIsSetWorkshopDateDialogOpen(true);
            }}
          >
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary={t("SetDate")} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              onIsMenuOpenChange(false);
              onDuplicateAndGotoWorkshop();
            }}
          >
            <ListItemIcon>
              <ContentCopy />
            </ListItemIcon>
            <ListItemText primary={t("Duplicate", { ns: "common" })} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              onIsMenuOpenChange(false);
              setIsRenameWorkshopDialogOpen(true);
            }}
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary={t("Rename", { ns: "common" })} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              onIsMenuOpenChange(false);
              setIsChangeDescriptionDialogOpen(true);
            }}
          >
            <ListItemIcon>
              <Description />
            </ListItemIcon>
            <ListItemText
              primary={
                workshop.description?.length
                  ? t("ChangeDescription")
                  : t("AddDescription")
              }
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              onIsMenuOpenChange(false);
              setIsWorkshopDeleteAlertOpen(true);
            }}
          >
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary={t("Delete", { ns: "common" })} />
          </ListItemButton>
        </List>
      </ResponsiveOptions>

      <ConfirmDialog
        title={t("DeleteWorkshop")}
        confirmText={t("Delete", { ns: "common" })}
        open={isWorkshopDeleteAlertOpen}
        onConfirm={() => {
          onDeleteWorkshop();
        }}
        onClose={() => setIsWorkshopDeleteAlertOpen(false)}
      />
      <DatePickerDialog
        title={t("SetDate")}
        isOpen={isSetWorkshopDateDialogOpen}
        onClose={() => setIsSetWorkshopDateDialogOpen(false)}
        initialValue={workshop.dateOfWorkshop ?? ""}
        onSave={onSaveWorkshopDate}
      />
      <TextFieldDialog
        title={t("Rename", { ns: "common" })}
        handleClose={() => setIsRenameWorkshopDialogOpen(false)}
        open={isRenameWorkshopDialogOpen}
        handleSave={changeWorkshopName}
        initialValue={workshop.name}
      />
      <TextFieldDialog
        title={t("ChangeDescription")}
        handleClose={() => setIsChangeDescriptionDialogOpen(false)}
        open={isChangeDescriptionDialogOpen}
        handleSave={changeWorkshopDescription}
        initialValue={workshop.description ?? ""}
        TextFieldProps={{
          multiline: true,
          rows: 3,
        }}
      />
    </>
  );
};
