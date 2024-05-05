import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import Share from "@mui/icons-material/Share";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTimeout } from "../hooks/use-timeout";

interface ContainerProps {
  urlToShare?: string;
}

export const ShareButton: React.FC<ContainerProps> = ({ urlToShare }) => {
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

  const copyUrlToClipboard = useCallback(() => {
    let pageUrl = urlToShare || window.location.href;
    if (!pageUrl.startsWith("http")) {
      pageUrl = window.location.origin + pageUrl;
    }

    navigator.clipboard.writeText(pageUrl);
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
    triggerCloseTimeout();
  }, [urlToShare, isOpen, triggerCloseTimeout]);

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={ref}
        onClick={copyUrlToClipboard}
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
