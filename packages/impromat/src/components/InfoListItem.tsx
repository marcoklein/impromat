import { Chip } from "@mui/material";

interface ContainerProps {
  icon?: JSX.Element;
  color?: string;
  displayText: string;
}

/**
 * Renders a list of icons and text. Use with `PreviewCard`.
 */
export const InfoListItem: React.FC<ContainerProps> = ({
  displayText,
  icon,
}) => {
  return (
    <Chip
      sx={{ mr: 1, borderStyle: "none" }}
      color="default"
      variant="outlined"
      size="small"
      icon={icon}
      label={displayText}
    ></Chip>
  );
};
