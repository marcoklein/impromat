import { Container, useScrollTrigger } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { PropsWithChildren, ReactNode, useMemo } from "react";
import { BackButton } from "./BackButton";

interface ContainerProps extends PropsWithChildren {
  title?: ReactNode;
  buttons?: JSX.Element | null;
  backButton?: boolean;
  backUrl?: string;
  noHeader?: boolean;
  activateOnScroll?: boolean;
  prominent?: boolean;
}

/**
 * A reusable page scaffold.
 */
export const PageScaffold: React.FC<ContainerProps> = ({
  title,
  noHeader,
  children,
  buttons,
  backButton,
  backUrl,
  activateOnScroll,
  prominent,
}) => {
  const scrollTarget = React.useRef<HTMLElement>(null);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: scrollTarget.current ?? window,
  });

  const isProminent = useMemo(
    () => !trigger && activateOnScroll,
    [trigger, activateOnScroll],
  );

  const showTitle = !prominent && (activateOnScroll ? trigger : true);
  const appBarColor = activateOnScroll
    ? trigger
      ? "inherit"
      : "transparent"
    : "inherit";

  return (
    <Box
      ref={scrollTarget}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      {!noHeader && (
        <AppBar
          sx={{
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
          }}
          position="sticky"
          color={appBarColor}
          elevation={!isProminent ? 4 : 0}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {backButton && <BackButton url={backUrl}></BackButton>}
            <Typography
              variant="h6"
              component="h1"
              sx={{
                flexGrow: 1,
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              {showTitle && title}
            </Typography>

            {buttons}
          </Toolbar>
          {prominent && (
            <Toolbar>
              <Container maxWidth="sm" sx={{ p: 0 }}>
                <Typography variant={"h5"} component="h1" sx={{ pb: 0.5 }}>
                  {title}
                </Typography>
              </Container>
            </Toolbar>
          )}
        </AppBar>
      )}
      {children}
    </Box>
  );
};
