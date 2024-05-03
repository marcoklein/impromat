import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { PropsWithChildren, ReactNode } from "react";
import { BackButton } from "./BackButton";

interface ContainerProps extends PropsWithChildren {
  title?: ReactNode;
  buttons?: JSX.Element | null;
  backButton?: boolean;
  backUrl?: string;
  noHeader?: boolean;
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
  prominent,
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
      {!noHeader && (
        <AppBar
          sx={{
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
          }}
          position="static"
          color="transparent"
          elevation={prominent ? 0 : undefined}
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
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
            {buttons}
          </Toolbar>
        </AppBar>
      )}
      {children}
    </Box>
  );
};
