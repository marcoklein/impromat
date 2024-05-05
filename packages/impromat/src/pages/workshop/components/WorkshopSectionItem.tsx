import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ListItem, ListItemText } from "@mui/material";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Stack from "@mui/material/Stack";
import { useMemo, useRef, useState } from "react";
import { OptionsButton } from "../../../components/OptionsButton";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { WorkshopSectionOptions } from "./WorkshopSectionOptions";

const WorkshopSectionItem_WorkshopSection = graphql(`
  fragment WorkshopSectionItem_WorkshopSection on WorkshopSection {
    id
    name
    isCollapsed
    elements {
      id
    }
    ...WorkshopSectionOptions_WorkshopSection
  }
`);

interface ContainerProps {
  workshopId: string;
  sectionFragment: FragmentType<typeof WorkshopSectionItem_WorkshopSection>;
  onCollapseClick: () => void;
  canEdit: boolean;
}

export const WorkshopSectionItem: React.FC<ContainerProps> = ({
  workshopId,
  sectionFragment,
  onCollapseClick,
  canEdit,
}) => {
  const section = getFragmentData(
    WorkshopSectionItem_WorkshopSection,
    sectionFragment,
  );
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const textElement = useMemo(
    () => (
      <ListItemText
        primary={section.name}
        primaryTypographyProps={{
          sx: {
            overflowX: "auto",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        }}
      />
    ),
    [section.name],
  );

  return (
    <Stack
      component="li"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        bgcolor: isDragging ? "grey.400" : "grey.100",
      }}
    >
      <Box display="flex">
        {canEdit ? (
          <ListItemButton
            onClick={onCollapseClick}
            disabled={isDragging}
            dense
            sx={{ pr: 0 }}
          >
            {canEdit && (
              <>
                <ListItemIcon>
                  <Badge
                    badgeContent={
                      section.isCollapsed && section.elements.length
                    }
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    {section.isCollapsed ? <ExpandLess /> : <ExpandMore />}
                  </Badge>
                </ListItemIcon>
                {textElement}
              </>
            )}
          </ListItemButton>
        ) : (
          <ListItem dense>{textElement}</ListItem>
        )}
        {canEdit && (
          <Box>
            <OptionsButton
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              ref={menuButtonRef}
            />
            <WorkshopSectionOptions
              isMenuOpen={isMenuOpen}
              onIsMenuOpenChange={setIsMenuOpen}
              workshopId={workshopId}
              workshopSectionFragment={section}
              menuButtonRef={menuButtonRef}
            />
          </Box>
        )}
      </Box>
    </Stack>
  );
};
