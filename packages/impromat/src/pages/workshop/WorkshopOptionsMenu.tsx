import { IonToast } from "@ionic/react";
import { calendar, close, copy, create, pencil, trash } from "ionicons/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { ConfirmationAlert } from "../../components/ConfirmationAlert";
import { OptionsMenu } from "../../components/OptionsMenu";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { useComponentLogger } from "../../hooks/use-component-logger";
import { useDeleteWorkshopMutation } from "../../hooks/use-delete-workshop-mutation";
import { useDuplicateWorkshopMutation } from "../../hooks/use-duplicate-workshop-mutation";
import { useInputDialog } from "../../hooks/use-input-dialog";
import { useUpdateWorkshopMutation } from "../../hooks/use-update-workshop-mutation";
import { routeWorkshop, routeWorkshops } from "../../routes/shared-routes";

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

export interface Option {}

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

  const [duplicatedWorkshop, setDuplicatedWorkshop] = useState<{
    id: string;
    name: string;
  }>();

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
  const onDuplicateWorkshop = async () => {
    if (!workshop) return;
    presentInputDialog({
      header: t("DuplicateWorkshopName"),
      initialText: workshop.name,
      message: t("EnterNameMessage"),
      placeholder: t("NamePlaceholder"),
      emptyInputMessage: t("EnterWorkshopName"),
      buttonText: t("Duplicate", { ns: "common" }),
      onAccept: async (newWorkshopName) => {
        const { error, data } = await duplicateWorkshopMutation({
          input: { workshopId: workshop.id, name: newWorkshopName },
        });
        const id = data?.duplicateWorkshop.id;
        if (error || !id) {
          return;
        }
        setDuplicatedWorkshop({ id: workshop.id, name: workshop.name });
        logger("Adding new workshop with id %s", id);
        const navigateTo = routeWorkshop(id);
        history.replace(navigateTo);
        logger("Navigating to %s", navigateTo);
      },
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
      header: t("Rename"),
      initialText: workshop.name,
      emptyInputMessage: t("TypeName"),
      onAccept: (text) => changeWorkshopName(text),
    });
    logger("Showing rename Workshop dialog");
  };

  return (
    <>
      <OptionsMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        header={t("Options", { ns: "common" })}
        options={[
          {
            icon: calendar,
            text: t("SetDate"),
            handler: () => {
              onSetWorkshopDate();
            },
          },
          {
            icon: copy,
            text: t("Duplicate", { ns: "common" }),
            handler: () => {
              onDuplicateWorkshop();
            },
          },
          {
            icon: pencil,
            text: t("Rename"),
            handler: () => {
              onRenameWorkshop();
            },
          },
          {
            icon: create,
            text: workshop.description?.length
              ? t("ChangeDescription")
              : t("AddDescription"),
            handler: () => {
              onChangeDescription();
            },
          },
          {
            text: t("Delete", { ns: "common" }),
            role: "destructive",
            icon: trash,
            handler: () => {
              setIsWorkshopDeleteAlertOpen(true);
            },
          },
          {
            text: t("Cancel", { ns: "common" }),
            role: "cancel",
            handler: () => {},
            icon: close,
          },
        ]}
      ></OptionsMenu>
      <ConfirmationAlert
        header={t("DeleteWorkshop")}
        confirmText={t("Delete", { ns: "common" })}
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
      <IonToast
        isOpen={!!duplicatedWorkshop}
        message={t("Duplicated", { workshopName: workshop.name })}
        onDidDismiss={() => setDuplicatedWorkshop(undefined)}
        buttons={[
          {
            text: t("Open", { ns: "common" }),
            handler: () => history.push(routeWorkshop(duplicatedWorkshop!.id)),
          },
          {
            role: "cancel",
            icon: close,
          },
        ]}
        duration={10000}
      ></IonToast>
    </>
  );
};
