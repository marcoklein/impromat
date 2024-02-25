import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

interface ContainerProps {
  menuButtonElement?: JSX.Element;
  infoListElement?: JSX.Element;
  /**
   * Title to display in the card.
   */
  title: string;
  /**
   * Content to display below the title.
   */
  content?: string;
  /**
   * Link to navigate to when clicking on the card.
   */
  routerLink?: string;
  /**
   * Footer to display at the bottom of the card.
   */
  footer?: JSX.Element;
}

export const PreviewCard: React.FC<ContainerProps> = ({
  menuButtonElement,
  infoListElement,
  title,
  content,
  routerLink,
  footer,
}) => {
  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={menuButtonElement}
        sx={{
          flexGrow: 1,
          flexDirection: "row",
          alignItems: "start",
          overflow: "hidden",
          height: "100%",
          width: "100%",
        }}
      >
        <ListItemButton
          sx={{
            height: "100%",
            alignItems: "start",
            flexDirection: "column",
            overflow: "hidden",
            width: "100%",
          }}
          component={routerLink ? Link : "div"}
          to={routerLink}
        >
          <Box
            sx={{
              display: "flex",
              cursor: { routerLink } ? "pointer" : undefined,
              whiteSpace: "nowrap",
              overflowX: "scroll",
              alignItems: "center",
              height: "2.5rem",
              width: "100%",
            }}
          >
            <Box>{infoListElement}</Box>
          </Box>
          <ListItemText
            sx={{
              pt: 0,
              mt: 0,
            }}
            primary={title}
            secondary={
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  "-webkit-line-clamp": 3 /* number of lines to show */,
                  "-webkit-box-orient": "vertical",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {content}
              </Box>
            }
          />
          {footer}
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
};
