import { PropsWithChildren } from "react";

import { IonPage } from "@ionic/react";
import { ArrowBack } from "@mui/icons-material";
import {
  AppBar,
  Box,
  CircularProgress,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface ContainerProps extends PropsWithChildren {
  defaultBackHref?: string;
  toolbarButtons?: JSX.Element | null;
  title?: string;
  noHeader?: boolean;
  /**
   * If set, the content will not be wrapped in a `IonContent` component.
   * Use, if you want to use a custom wrapper e.g. for getting scroll events.
   *
   * @default false
   */
  customContentWrapper?: boolean;
  bottomToolbar?: JSX.Element | null;
  footer?: JSX.Element | null;
  showProgressBar?: boolean;
}

/**
 * A reusable page scaffold component for Ionic React apps.
 */
export const PageScaffold: React.FC<ContainerProps> = ({
  children,
  title,
  noHeader,
  bottomToolbar,
  customContentWrapper,
  toolbarButtons,
  defaultBackHref,
  footer,
  showProgressBar,
}) => {
  return (
    <IonPage>
      <Box sx={{ flexGrow: 1 }}>
        {!noHeader && (
          <AppBar position="static">
            <Toolbar>
              {defaultBackHref && (
                <IconButton
                  component={Link}
                  to={defaultBackHref}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="Back"
                  sx={{ mr: 2 }}
                >
                  <ArrowBack></ArrowBack>
                </IconButton>
              )}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {title}
              </Typography>
              {toolbarButtons}
            </Toolbar>
          </AppBar>
        )}
        {bottomToolbar}
        {customContentWrapper ? (
          children
        ) : (
          <Container sx={{ paddingTop: 2 }}>{children}</Container>
        )}
        {footer}
        {showProgressBar && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </IonPage>
  );
};
