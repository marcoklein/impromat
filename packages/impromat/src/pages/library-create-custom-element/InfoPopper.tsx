import { Close, Info } from "@mui/icons-material";
import { IconButton, Paper, Popper, Typography } from "@mui/material";
import React, { useState } from "react";

interface ComponentProps {
  /**
   * The message to show in the popper. Can be a string or a JSX element.
   */
  message: React.ReactNode;
  /**
   * The icon to show. If not provided, the default info icon will be used.
   */
  iconElement?: JSX.Element;
}

/**
 * A popper that shows a message when clicked.
 *
 * Use this component to show more details about a specific field or action.
 */
export const InfoPopper: React.FC<ComponentProps> = ({
  message,
  iconElement,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick} aria-label="info">
        {iconElement ? iconElement : <Info color="info" />}
        <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
          <Paper
            elevation={3}
            sx={{ p: 1, mx: 1, border: 1, maxWidth: "400px" }}
          >
            <IconButton
              sx={{ float: "right" }}
              aria-label="close"
              size="small"
              onClick={() => setAnchorEl(null)}
            >
              <Close />
            </IconButton>
            <Typography>{message}</Typography>
          </Paper>
        </Popper>
      </IconButton>
    </>
  );
};
