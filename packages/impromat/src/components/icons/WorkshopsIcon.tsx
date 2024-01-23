import { List } from "@mui/icons-material";
import { ComponentPropsWithoutRef } from "react";

export const WorkshopsIcon: React.FC<ComponentPropsWithoutRef<typeof List>> = (
  props,
) => {
  return <List {...props} />;
};
