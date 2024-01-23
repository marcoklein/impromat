import { Add } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogScaffold } from "../../components/DialogScaffold";
import { FragmentType, getFragmentData, graphql } from "../../graphql-client";
import { AddToWorkshopSelectDialog_WorkshopFragment } from "../../graphql-client/graphql";
import { CreateWorkshopDialog } from "./CreateWorkshopDialog";

const AddToWorkshopSelectDialog_Workshop = graphql(`
  fragment AddToWorkshopSelectDialog_Workshop on Workshop {
    id
    name
    sections {
      id
    }
  }
`);

interface ContainerProps {
  open: boolean;
  handleClose: () => void;
  workshopsFragment: FragmentType<typeof AddToWorkshopSelectDialog_Workshop>[];
  onWorkshopSelect: (
    workshop: AddToWorkshopSelectDialog_WorkshopFragment,
  ) => void;
}

export const AddToWorkshopSelectDialog: React.FC<ContainerProps> = ({
  open,
  handleClose,
  workshopsFragment,
  onWorkshopSelect,
}) => {
  const { t } = useTranslation("AddToWorkshopSelectDialog");
  const workshops = getFragmentData(
    AddToWorkshopSelectDialog_Workshop,
    workshopsFragment,
  );

  const [isCreateWorkshopDialogOpen, setIsCreateWorkshopDialogOpen] =
    useState(false);
  const noWorkshops = useMemo(() => workshops.length === 0, [workshops]);

  return (
    <DialogScaffold
      open={open}
      handleClose={handleClose}
      title={t("Add to Workshop")}
    >
      <DialogTitle component="h4" sx={{ m: 0, py: 0 }} variant="body1">
        {t("Select a workshop to add this element to.")}
      </DialogTitle>
      <DialogContent>
        <List sx={{ bgcolor: "background.paper" }}>
          {workshops.map((workshop) => (
            <ListItemButton
              key={workshop.id}
              onClick={() => onWorkshopSelect(workshop)}
            >
              <ListItemText primary={workshop.name} />
              {/* <Add /> */}
            </ListItemButton>
          ))}
          {noWorkshops && (
            <Typography variant="body2" sx={{ px: 2, pt: 2 }}>
              {t("No workshops found.")}
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <CreateWorkshopDialog
          open={isCreateWorkshopDialogOpen}
          handleClose={() => setIsCreateWorkshopDialogOpen(false)}
        />
        <Button
          color="inherit"
          fullWidth={noWorkshops}
          variant={noWorkshops ? "contained" : "outlined"}
          onClick={() => setIsCreateWorkshopDialogOpen(true)}
        >
          {t("Create new workshop")}
        </Button>
      </DialogActions>
    </DialogScaffold>
  );
};
