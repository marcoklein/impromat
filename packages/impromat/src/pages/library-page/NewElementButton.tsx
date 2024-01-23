import { Fab } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AddNewElementIcon } from "../../components/icons/AddNewElement";
import { routeLibraryCreateCustomElement } from "../../routes/library-routes";

interface ContainerProps {}

export const NewElementButton: React.FC<ContainerProps> = () => {
  const { t } = useTranslation("NewElementButton");
  return (
    <Fab
      color="primary"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      component={Link}
      to={routeLibraryCreateCustomElement()}
      aria-label={t("NewElement")}
    >
      <AddNewElementIcon />
    </Fab>
  );
};
