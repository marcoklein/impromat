import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ContainerProps {
  onCreateWorkshopClick: () => void;
}

export const WorkshopCreateFirstComponent: React.FC<ContainerProps> = ({
  onCreateWorkshopClick,
}) => {
  const { t } = useTranslation("WorkshopsCreateFirstComponent");
  return (
    <div
      className="ion-padding"
      style={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography>{t("StartWorkshop")}</Typography>
      <Button onClick={() => onCreateWorkshopClick()} startIcon={<Add />}>
        {t("AddWorkshop")}
      </Button>
    </div>
  );
};
