import { PlaylistAdd } from "@mui/icons-material";
import { ComponentPropsWithoutRef } from "react";

export const AddToWorkshopIcon: React.FC<
  ComponentPropsWithoutRef<typeof PlaylistAdd>
> = (props) => {
  return <PlaylistAdd {...props} />;
};
