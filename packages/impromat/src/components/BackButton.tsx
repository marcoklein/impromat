import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useCallback } from "react";
import { useHistory } from "react-router";

interface ContainerProps {}

export const BackButton: React.FC<ContainerProps> = () => {
  const history = useHistory();
  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <IconButton onClick={goBack} sx={{ mr: 2 }} color="inherit">
      <ArrowBack />
    </IconButton>
  );
};
