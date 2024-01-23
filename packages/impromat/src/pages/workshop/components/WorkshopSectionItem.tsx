import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Badge,
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
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
}

export const WorkshopSectionItem: React.FC<ContainerProps> = ({
  workshopId,
  sectionFragment,
  onCollapseClick,
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
        <ListItemButton
          key={section.name}
          onClick={onCollapseClick}
          disabled={isDragging}
          dense
          sx={{ pr: 0 }}
        >
          <ListItemIcon>
            <Badge
              badgeContent={section.isCollapsed && section.elements.length}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              {section.isCollapsed ? <ExpandLess /> : <ExpandMore />}
            </Badge>
          </ListItemIcon>
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
        </ListItemButton>
        <Box>
          <WorkshopSectionOptions
            workshopId={workshopId}
            workshopSectionFragment={section}
          />
        </Box>
      </Box>
      <Divider variant="fullWidth" />
    </Stack>
  );
};
