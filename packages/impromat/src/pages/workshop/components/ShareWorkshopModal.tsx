import { Check, LinkOutlined } from "@mui/icons-material";
import {
  Checkbox,
  DialogContent,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DialogScaffold } from "../../../components/DialogScaffold";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useUpdateWorkshopMutation } from "../../../hooks/use-update-workshop-mutation";

export const ShareWorkshopModal_Workshop = graphql(`
  fragment ShareWorkshopModal_Workshop on Workshop {
    id
    isPublic
    isListed
  }
`);

interface ComponentProps {
  isSharingModalOpen: boolean;
  setIsSharingModalOpen: (isOpen: boolean) => void;
  workshopFragment: FragmentType<typeof ShareWorkshopModal_Workshop>;
}

export const ShareWorkshopModal: React.FC<ComponentProps> = ({
  isSharingModalOpen,
  setIsSharingModalOpen,
  workshopFragment,
}) => {
  const logger = useComponentLogger("ShareWorkshopModal");

  const workshop = getFragmentData(
    ShareWorkshopModal_Workshop,
    workshopFragment,
  );

  const [isCopied, setIsCopied] = useState(false);
  const [, updateWorkshopMutation] = useUpdateWorkshopMutation();

  const onPublicClick = useCallback(
    (isPublic: boolean) => {
      if (!workshop) return;
      logger("update public workshop state to %s", isPublic);
      updateWorkshopMutation({
        input: { id: workshop.id, isPublic },
      });
    },
    [logger, updateWorkshopMutation, workshop],
  );

  const onListClick = useCallback(
    (isListed: boolean) => {
      if (!workshop) return;
      logger("update workshop listed state to %s", isListed);
      updateWorkshopMutation({
        input: { id: workshop.id, isListed },
      });
    },
    [logger, updateWorkshopMutation, workshop],
  );
  const { t } = useTranslation("ShareWorkshopModal");

  return (
    <DialogScaffold
      open={isSharingModalOpen}
      handleClose={() => setIsSharingModalOpen(false)}
      title={t("ShareWorkshop")}
    >
      <DialogContent>
        <ListItemButton onClick={() => onPublicClick(!workshop.isPublic)}>
          <ListItemIcon>
            <Checkbox
              checked={workshop.isPublic ?? false}
              inputProps={{ "aria-labelledby": "linkShared" }}
            />
          </ListItemIcon>
          <ListItemText id="linkShared" primary={t("AnyoneCanView")} />
        </ListItemButton>
        {!workshop.isPublic && !workshop.isListed && (
          <Typography color="inherit" component="p">
            {t("CheckboxMessage")}
          </Typography>
        )}
        {(workshop.isPublic || workshop.isListed) && (
          <>
            <ListItemButton onClick={() => onListClick(!workshop.isListed)}>
              <ListItemIcon>
                <Checkbox
                  checked={workshop.isListed ?? false}
                  inputProps={{ "aria-labelledby": "isPublic" }}
                />
              </ListItemIcon>
              <ListItemText id="isPublic" primary={t("ShareWithCommunity")} />
            </ListItemButton>

            {workshop.isListed ? (
              <Typography component="p">{t("ThankyouInfo")}</Typography>
            ) : (
              <Typography component="p">{t("ShareInfo")}</Typography>
            )}

            <ListItemButton
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setIsCopied(true);
              }}
            >
              <ListItemIcon>
                {isCopied ? <Check /> : <LinkOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={
                  isCopied ? t("CopiedWorkshopLink") : t("CopyWorkshopLink")
                }
              />
            </ListItemButton>
          </>
        )}
      </DialogContent>
    </DialogScaffold>
  );
};
