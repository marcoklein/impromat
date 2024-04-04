import { CheckCircleOutline, Share } from "@mui/icons-material";
import {
  Fade,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Popper,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTimeout } from "../hooks/use-timeout";

interface ContainerProps {}

export const ShareButton: React.FC<ContainerProps> = () => {
  const { t } = useTranslation("ShareButton");

  const [isOpen, setIsOpen] = useState(false);
  const autoCloseTimeout = 8000;

  const [triggerCloseTimeout, isAutoCloseCompleted, resetTimeout] =
    useTimeout(autoCloseTimeout);

  useEffect(() => {
    if (isAutoCloseCompleted) {
      setIsOpen(false);
    }
  }, [isAutoCloseCompleted]);

  useEffect(() => {
    if (!isOpen) {
      resetTimeout();
    }
  }, [isOpen, resetTimeout]);

  const copyCurrentUrlToClipboard = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
    triggerCloseTimeout();
  }, [triggerCloseTimeout, isOpen]);

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={ref}
        onClick={copyCurrentUrlToClipboard}
        sx={{ mr: 2 }}
        color="inherit"
        aria-label={t("share")}
      >
        <Share />
      </IconButton>
      <Popper open={isOpen} anchorEl={ref.current} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              sx={{ m: 1 }}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <ListItem>
                <ListItemText>{t("copiedUrl")}</ListItemText>
                <CheckCircleOutline sx={{ ml: 1 }} color="success" />
              </ListItem>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};
