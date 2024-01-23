import { MoreVert } from "@mui/icons-material";
import {
  Backdrop,
  Drawer,
  IconButton,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { ReactNode, useCallback, useState } from "react";
import { useBreakpoints } from "../hooks/use-breakpoints";

interface ComponentProps {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveOptions: React.FC<ComponentProps> = ({
  title,
  children,
  open,
  onOpenChange,
}) => {
  const { sm } = useBreakpoints();

  const [internalAnchorElement, setInternalAnchorElement] =
    useState<null | HTMLElement>(null);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setInternalAnchorElement(null);
  }, [onOpenChange]);

  return (
    <>
      <IconButton
        onClick={(event) => {
          setInternalAnchorElement(event.currentTarget);
          onOpenChange(!open);
        }}
      >
        <MoreVert color="action" />
      </IconButton>
      {sm ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            },
          }}
        >
          <ListItemText>
            <Typography
              sx={{ pt: 2, px: 2, pb: 1 }}
              variant="subtitle1"
              color="gray"
            >
              {title}
            </Typography>
          </ListItemText>
          {children}
        </Drawer>
      ) : (
        <Backdrop
          open={open}
          onClick={handleClose}
          sx={{
            color: "white",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Popper
            open={open}
            anchorEl={internalAnchorElement}
            placement="right-start"
          >
            <Paper>{children}</Paper>
          </Popper>
        </Backdrop>
      )}
    </>
  );
};
