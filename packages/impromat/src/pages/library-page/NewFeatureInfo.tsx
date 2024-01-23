import { Check } from "@mui/icons-material";
import { Alert, IconButton } from "@mui/material";
import { usePersistedState } from "../../hooks/use-persisted-state";

interface ContainerProps {
  featureId: string;
  message: string;
}
export const NewFeatureInfo: React.FC<ContainerProps> = ({
  featureId,
  message,
}) => {
  const [show, setShow] = usePersistedState(`featureInfo-${featureId}`, true);
  return (
    <>
      {show && (
        <Alert
          sx={{ color: "inherit" }}
          severity="info"
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={() => setShow(false)}
            >
              <Check></Check>
            </IconButton>
          }
        >
          {message}
        </Alert>
      )}
    </>
  );
};
