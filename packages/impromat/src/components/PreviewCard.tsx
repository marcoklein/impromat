import { CardHeader, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  buttonsElement: JSX.Element;
  infoListElement?: JSX.Element;
  titleElement: JSX.Element;
  /**
   * Triggered, if card header or content is clicked.
   * Will not trigger if a button or the info list is clicked.
   */
  onCardClick: () => void;
}

export const PreviewCard: React.FC<ContainerProps> = ({
  buttonsElement: buttons,
  infoListElement,
  titleElement,
  children,
  onCardClick,
}) => {
  return (
    <Paper
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      elevation={2}
    >
      <Box sx={{ overflow: "hidden", flexGrow: 1, p: 1 }}>
        <Box
          sx={{
            // mt: 2,
            // mr: 2,
            ml: 1,
            float: "right",
            maxWidth: "50%",
            textOverflow: "ellipsis",
          }}
        >
          {infoListElement}
        </Box>
        <Typography variant="h6" component="div">
          {titleElement}
        </Typography>
        <span onClick={() => onCardClick && onCardClick()}>{children}</span>
      </Box>
      <CardActions>{buttons}</CardActions>
    </Paper>
  );
};
