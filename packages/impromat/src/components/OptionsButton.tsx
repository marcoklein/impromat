import MoreVert from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { t } from "i18next";
import { forwardRef } from "react";

interface ContainerProps {
  onClick: () => void;
}

export const OptionsButton = forwardRef<HTMLButtonElement, ContainerProps>(
  function ({ onClick }: ContainerProps, ref) {
    return (
      <IconButton
        ref={ref}
        aria-label={t("Options", { ns: "common" })}
        onClick={onClick}
        color="inherit"
      >
        <MoreVert />
      </IconButton>
    );
  },
);
