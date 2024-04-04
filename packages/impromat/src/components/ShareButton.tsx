import { CheckCircleOutline, Share } from "@mui/icons-material";
import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useProgress } from "../hooks/use-progress";

interface ContainerProps {}

export const ShareButton: React.FC<ContainerProps> = () => {
  const { t } = useTranslation("ShareButton");

  const [isOpen, setIsOpen] = useState(false);
  const autoCloseTimeout = 5000;

  const [triggerCloseTimeout, isAutoCloseCompleted, closingProgress] =
    useProgress(autoCloseTimeout);

  useEffect(() => {
    if (isAutoCloseCompleted) {
      setIsOpen(false);
    }
  }, [isAutoCloseCompleted]);

  const progressBar = useMemo(
    () => (closingProgress / autoCloseTimeout) * 100,
    [closingProgress, autoCloseTimeout],
  );

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
        {!isOpen ? <Share /> : <CheckCircleOutline color="inherit" />}
      </IconButton>
      <Popper open={isOpen} anchorEl={ref.current}>
        <Paper>
          <Box sx={{ p: 1 }}>
            <Typography>
              Copied URL to clipboard.
              <br />
              Go ahead and share Impromat.app!
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            color="success"
            value={progressBar}
          />
        </Paper>
      </Popper>
    </>
  );
};
