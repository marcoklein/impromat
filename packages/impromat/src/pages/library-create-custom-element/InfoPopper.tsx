import { Close, Info } from "@mui/icons-material";
import { IconButton, Paper, Popper } from "@mui/material";
import React, { useState } from "react";

interface ComponentProps {
  message: React.ReactNode;
}

/**
 * A popper that shows a message when clicked.
 */
export const InfoPopper: React.FC<ComponentProps> = ({ message }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Info />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
        <Paper elevation={3} sx={{ p: 1, mx: 1, border: 1, maxWidth: "400px" }}>
          <IconButton
            sx={{ float: "right" }}
            aria-label="close"
            size="small"
            onClick={() => setAnchorEl(null)}
          >
            <Close />
          </IconButton>
          {message}
        </Paper>
      </Popper>
    </>
  );
};
