import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
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
      <p>{t("StartWorkshop")}</p>
      <Button onClick={() => onCreateWorkshopClick()} startIcon={<Add />}>
        {t("AddWorkshop")}
      </Button>
    </div>
  );
};
