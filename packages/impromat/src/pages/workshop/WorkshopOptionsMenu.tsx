import { close, create, pencil, trash } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useDeleteWorkshopMutation } from "../../hooks/use-delete-workshop-mutation";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeWorkshops } from "../../routes/shared-routes";
import { ConfirmationAlert } from "../../components/ConfirmationAlert";
import { OptionsMenu } from "../../components/OptionsMenu";

const WorkshopOptionsMenu_Workshop = graphql(`
  fragment WorkshopOptionsMenu_Workshop on Workshop {
    id
    name
    description
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopOptionsMenu_Workshop>;
  goBackAfterDeletion?: boolean;
}

export interface Option {}

export const WorkshopOptionsMenu: React.FC<ContainerProps> = ({
  workshopFragment,
  goBackAfterDeletion,
}) => {
  const logger = useComponentLogger("WorkshopOptionsMenu");
  const workshop = getFragmentData(
    WorkshopOptionsMenu_Workshop,
    workshopFragment,
  );

  const history = useHistory();

  const [presentInputDialog] = useInputDialog();
  const [, deleteWorkshopMutation] = useDeleteWorkshopMutation();
  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();

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

  const onChangeDescription = () => {
    if (!workshop) return;
    presentInputDialog({
      initialText: workshop.description ?? "",
      isMultiline: true,
      header: "Description",
      onAccept: (text) => changeWorkshopDescription(text),
    });
    logger("Showing change description dialog");
  };

  const onRenameWorkshop = () => {
    if (!workshop) return;
    presentInputDialog({
      header: "Rename",
      initialText: workshop.name,
      emptyInputMessage: "Please type a workshop name.",
      onAccept: (text) => changeWorkshopName(text),
    });
    logger("Showing rename Workshop dialog");
  };

  return (
    <>
      <OptionsMenu
        header="Options"
        options={[
          {
            icon: pencil,
            text: "Rename",
            handler: () => {
              onRenameWorkshop();
            },
          },
          {
            icon: create,
            text: `${
              workshop.description?.length ? "Change" : "Add"
            } Description`,
            handler: () => {
              onChangeDescription();
            },
          },
          {
            text: "Delete",
            role: "destructive",
            icon: trash,
            handler: () => {
              setIsWorkshopDeleteAlertOpen(true);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {},
            icon: close,
          },
        ]}
      ></OptionsMenu>
      <ConfirmationAlert
        header="Delete Workshop?"
        confirmText="Delete"
        isOpen={isWorkshopDeleteAlertOpen}
        onConfirm={() => {
          logger("Deletion confirmed");
          deleteWorkshopMutation({ id: workshop.id }).then(() => {
            logger("Deleted workshop");
            if (goBackAfterDeletion) {
              history.push(routeWorkshops(), { direction: "back" });
            }
          });
        }}
        onOpenChange={setIsWorkshopDeleteAlertOpen}
      ></ConfirmationAlert>
    </>
  );
};
