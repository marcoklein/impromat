import { Add, List } from "@mui/icons-material";
import { ComponentPropsWithoutRef } from "react";

export const AddNewElementIcon: React.FC<
  ComponentPropsWithoutRef<typeof List>
> = (props) => {
  return <Add {...props} />;
};
