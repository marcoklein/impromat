import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { OptionsButton } from "../../../components/OptionsButton";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useUpdateWorkshopMutation } from "../../../hooks/use-update-workshop-mutation";
import { routeWorkshopElement } from "../../../routes/shared-routes";
import { WorkshopElementOptionsMenu } from "./WorkshopElementOptionsMenu";

const WorkshopElementItem_WorkshopElement = graphql(`
  fragment WorkshopElementItem_WorkshopElement on WorkshopElement {
    id
    note
    basedOn {
      id
      name
    }
  }
`);

interface ContainerProps {
  workshopId: string;
  sectionId: string;
  workshopElementFragment: FragmentType<
    typeof WorkshopElementItem_WorkshopElement
  >;
  canEdit: boolean;
}

export const WorkshopElementItem: React.FC<ContainerProps> = ({
  workshopId,
  sectionId,
  workshopElementFragment,
  canEdit,
}) => {
  const workshopElement = getFragmentData(
    WorkshopElementItem_WorkshopElement,
    workshopElementFragment,
  );
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: workshopElement.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();
  const elementOnRemoveClick = () => {
    updateWorkshopMutation({
      input: {
        id: workshopId,
        sections: {
          update: [
            {
              id: sectionId,
              elements: { delete: [{ id: workshopElement.id }] },
            },
          ],
        },
      },
    });
  };

  return (
    <>
      <Stack
        component="li"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          bgcolor: isDragging ? "grey.400" : "transparent",
        }}
        spacing={0}
      >
        <Box display="flex" justifyItems="stretch" alignItems="start">
          <ListItemButton
            key={workshopElement.id}
            component={Link}
            disabled={isDragging}
            to={routeWorkshopElement(workshopId, workshopElement.id)}
          >
            <ListItemText
              primary={workshopElement.basedOn.name}
              secondary={workshopElement.note}
            />
          </ListItemButton>
          {canEdit && (
            <>
              <OptionsButton
                ref={menuButtonRef}
                onClick={() => setIsMenuOpen(true)}
              />
              <WorkshopElementOptionsMenu
                disabled={isDragging}
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                onRemoveClick={elementOnRemoveClick}
                menuButtonRef={menuButtonRef}
              ></WorkshopElementOptionsMenu>
            </>
          )}
        </Box>
        <Divider variant="fullWidth" />
      </Stack>
    </>
  );
};
