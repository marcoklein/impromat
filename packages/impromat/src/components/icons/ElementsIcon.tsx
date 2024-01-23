import { Book, LibraryBooks } from "@mui/icons-material";
import { ComponentPropsWithoutRef } from "react";

export const ElementsIcon: React.FC<ComponentPropsWithoutRef<typeof Book>> = (
  props,
) => {
  return <LibraryBooks {...props} />;
};
