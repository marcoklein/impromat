import { Add, List } from "@mui/icons-material";
import { ComponentPropsWithoutRef } from "react";

export const AddNewWorkshopIcon: React.FC<
  ComponentPropsWithoutRef<typeof List>
> = (props) => {
  return <Add {...props} />;
};
