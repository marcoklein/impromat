import { Chip } from "@mui/material";
import { Icon } from "./Icon";

interface ContainerProps {
  icon?: JSX.Element;
  color?: string;
  displayText: string;
  tablerIcon?: string;
  /**
   * Display options for extra small screens.
   */
  xs?: {
    hideIcon?: boolean;
    hideText?: boolean;
  };
}

/**
 * Renders a list of icons and text. Use with `PreviewCard`.
 */
export const InfoListItem: React.FC<ContainerProps> = ({
  displayText,
  color,
  tablerIcon,
  icon,
  xs,
}) => {
  return (
    <Chip
      sx={{ mr: 1, borderStyle: "none" }}
      color="default"
      variant="outlined"
      size="small"
      icon={
        tablerIcon ? (
          <Icon
            className={xs?.hideIcon === true ? "ion-hide-sm-down" : ""}
            color={color}
            tablerIcon={tablerIcon}
          ></Icon>
        ) : (
          icon
        )
      }
      label={displayText}
    ></Chip>
  );
};
