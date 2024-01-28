import {
  ContentCopy,
  Delete,
  Description,
  Edit,
  Event,
} from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { ResponsiveOptions } from "../../../components/ResponsiveOptions";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useDeleteWorkshopMutation } from "../../../hooks/use-delete-workshop-mutation";
import { useDuplicateWorkshopMutation } from "../../../hooks/use-duplicate-workshop-mutation";
import { useInputDialog } from "../../../hooks/use-input-dialog";
import { useUpdateWorkshopMutation } from "../../../hooks/use-update-workshop-mutation";
import { routeWorkshop, routeWorkshops } from "../../../routes/shared-routes";
import { ConfirmDialog } from "./ConfirmationDialog";

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
}

/**
 * Options menu for manipulating a Workshop.
 */
export const WorkshopOptionsMenu: React.FC<ContainerProps> = ({
  workshopFragment,
  goBackAfterDeletion,
}) => {
  const logger = useComponentLogger("WorkshopOptionsMenu");
  const workshop = getFragmentData(
    WorkshopOptionsMenu_Workshop,
    workshopFragment,
  );

  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const [presentInputDialog] = useInputDialog();
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

  const onSetWorkshopDate = async () => {
    if (!workshop) return;
    presentInputDialog({
      header: t("SetDate"),
      initialText: workshop.dateOfWorkshop
        ? new Date(workshop.dateOfWorkshop).toISOString().slice(0, 10)
        : // ? new Date(workshop.dateOfWorkshop).toLocaleDateString()
          "",
      message: t("EnterDate"),
      placeholder: t("DatePlaceholder"),
      // emptyInputMessage: "Please enter a date for your workshop.",
      buttonText: t("Set"),
      inputType: "date",
      onAccept: async (date) => {
        logger("Setting date of workshop to %s", date);
        const { error } = await updateWorkshopMutation({
          input: { id: workshop.id, dateOfWorkshop: date.length ? date : null },
        });
        if (error) {
          logger("Error setting date of workshop: %s", error.message);
          return;
        }
      },
    });
  };
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
    });
  };

  const onChangeDescription = () => {
    if (!workshop) return;
    presentInputDialog({
      initialText: workshop.description ?? "",
      isMultiline: true,
      header: t("WorkshopDescription"),
      onAccept: (text) => changeWorkshopDescription(text),
    });
    logger("Showing change description dialog");
  };

  const onRenameWorkshop = () => {
    if (!workshop) return;
    presentInputDialog({
      header: t("Rename", { ns: "common" }),
      initialText: workshop.name,
      emptyInputMessage: t("TypeName"),
      onAccept: (text) => changeWorkshopName(text),
    });
    logger("Showing rename Workshop dialog");
  };

  return (
    <>
      <ResponsiveOptions
        title={t("Options", { ns: "common" })}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <List disablePadding>
          <ListItemButton
            onClick={() => {
              setIsOpen(false);
              onSetWorkshopDate();
            }}
          >
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary={t("SetDate")} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setIsOpen(false);
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
              setIsOpen(false);
              onRenameWorkshop();
            }}
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary={t("Rename", { ns: "common" })} />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setIsOpen(false);
              onChangeDescription();
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
              setIsOpen(false);
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
    </>
  );
};
