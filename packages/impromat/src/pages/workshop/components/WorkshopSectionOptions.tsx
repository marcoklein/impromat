import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveOptions } from "../../../components/ResponsiveOptions";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useUpdateWorkshopMutation } from "../../../hooks/use-update-workshop-mutation";
import { ConfirmDialog } from "./ConfirmationDialog";
import { TextFieldDialog } from "./TextFieldDialog";

const WorkshopSectionOptions_WorkshopSection = graphql(`
  fragment WorkshopSectionOptions_WorkshopSection on WorkshopSection {
    id
    name
  }
`);

interface ComponentProps {
  workshopId: string;
  workshopSectionFragment: FragmentType<
    typeof WorkshopSectionOptions_WorkshopSection
  >;
  onIsMenuOpenChange: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  menuButtonRef: React.RefObject<HTMLElement>;
}

export const WorkshopSectionOptions: React.FC<ComponentProps> = ({
  workshopId,
  workshopSectionFragment,
  onIsMenuOpenChange,
  isMenuOpen,
  menuButtonRef,
}) => {
  const { t } = useTranslation("WorkshopSectionOptions");

  const workshopSection = getFragmentData(
    WorkshopSectionOptions_WorkshopSection,
    workshopSectionFragment,
  );

  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();
  const [isSectionNameDialogOpen, setIsSectionNameDialogOpen] = useState(false);
  const [isSectionDeleteDialogOpen, setIsSectionDeleteDialogOpen] =
    useState(false);

  const onEditClick = (newSectionName: string) => {
    updateWorkshopMutation({
      input: {
        id: workshopId,
        sections: {
          update: [
            {
              id: workshopSection.id,
              name: newSectionName,
            },
          ],
        },
      },
    });
  };

  const onRemoveClick = () => {
    console.log("remove");
    updateWorkshopMutation({
      input: {
        id: workshopId,
        sections: {
          delete: [{ id: workshopSection.id }],
        },
      },
    });
  };

  return (
    <>
      <ResponsiveOptions
        open={isMenuOpen}
        onOpenChange={onIsMenuOpenChange}
        title={t("Options", { ns: "common" })}
        menuButtonRef={menuButtonRef}
      >
        <List disablePadding>
          <ListItemButton
            onClick={() => {
              onIsMenuOpenChange(false);
              setIsSectionNameDialogOpen(true);
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
              setIsSectionDeleteDialogOpen(true);
            }}
          >
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary={t("Delete", { ns: "common" })} />
          </ListItemButton>
        </List>
      </ResponsiveOptions>
      <TextFieldDialog
        open={isSectionNameDialogOpen}
        title={t("Rename", { ns: "common" })}
        handleClose={() => setIsSectionNameDialogOpen(false)}
        handleSave={onEditClick}
        initialValue={workshopSection.name ?? ""}
      />
      <ConfirmDialog
        open={isSectionDeleteDialogOpen}
        title={`${t("Delete", { ns: "common" })}?`}
        onClose={() => setIsSectionDeleteDialogOpen(false)}
        onConfirm={onRemoveClick}
        confirmText={t("Delete", { ns: "common" })}
      ></ConfirmDialog>
    </>
  );
};
