import LinkIcon from "@mui/icons-material/Link";
import Lock from "@mui/icons-material/Lock";
import Public from "@mui/icons-material/Public";
import IconButton from "@mui/material/IconButton";
import { t } from "i18next";
import { useState } from "react";
import {
  FragmentType,
  getFragmentData,
  graphql,
} from "../../../graphql-client";
import { ShareWorkshopModal } from "./ShareWorkshopModal";

const WorkshopSharingButton_Workshop = graphql(`
  fragment WorkshopSharingButton_Workshop on Workshop {
    id
    isPublic
    isListed
    ...ShareWorkshopModal_Workshop
  }
`);

interface ContainerProps {
  workshopFragment: FragmentType<typeof WorkshopSharingButton_Workshop>;
}

export const WorkshopSharingButton: React.FC<ContainerProps> = ({
  workshopFragment,
}) => {
  const workshop = getFragmentData(
    WorkshopSharingButton_Workshop,
    workshopFragment,
  );

  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setIsSharingModalOpen(true)}
        aria-label={t("Share", { ns: "common" })}
        color="inherit"
      >
        {workshop.isPublic ? (
          workshop.isListed ? (
            <Public />
          ) : (
            <LinkIcon />
          )
        ) : (
          <Lock />
        )}
      </IconButton>
      <ShareWorkshopModal
        isSharingModalOpen={isSharingModalOpen}
        setIsSharingModalOpen={setIsSharingModalOpen}
        workshopFragment={workshop}
      ></ShareWorkshopModal>
    </>
  );
};
