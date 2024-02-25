import { Info } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { ReactNode } from "react";

interface ContainerProps {
  primary?: ReactNode;
  secondary?: ReactNode;
}

export const InfoItemComponent: React.FC<ContainerProps> = ({
  primary,
  secondary,
}) => (
  <ListItem>
    <ListItemIcon>
      <Info color="info" />
    </ListItemIcon>
    <ListItemText primary={primary} secondary={secondary} />
  </ListItem>
);
