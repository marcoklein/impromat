import Backdrop from "@mui/material/Backdrop";
import Drawer from "@mui/material/Drawer";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import { ReactNode, useCallback } from "react";
import { useBreakpoints } from "../hooks/use-breakpoints";

interface ComponentProps {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuButtonRef: React.RefObject<HTMLElement>;
}

/**
 * Displays a drawer on small screens and a popover on larger screens.
 */
export const ResponsiveOptions: React.FC<ComponentProps> = ({
  title,
  children,
  open,
  onOpenChange,
  menuButtonRef,
}) => {
  const { sm } = useBreakpoints();

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <>
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
            anchorEl={menuButtonRef.current}
            placement="right-start"
          >
            <Paper>{children}</Paper>
          </Popper>
        </Backdrop>
      )}
    </>
  );
};
