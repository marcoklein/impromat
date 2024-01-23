import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { PropsWithChildren, ReactNode } from "react";
import { BackButton } from "./BackButton";

interface ContainerProps extends PropsWithChildren {
  title: ReactNode;
  buttons?: JSX.Element | null;
  backButton?: boolean;
}

/**
 * A reusable page scaffold.
 */
export const PageScaffold: React.FC<ContainerProps> = ({
  title,
  children,
  buttons,
  backButton,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      <AppBar
        sx={{
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
        }}
        position="static"
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            px: {
              xs: 0.5,
              sm: 2,
            },
          }}
        >
          {backButton && <BackButton></BackButton>}
          <Typography
            variant="h6"
            component="h1"
            sx={{
              flexGrow: 1,
              overflowX: "auto",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
          {buttons}
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};
