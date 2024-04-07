import Games from "@mui/icons-material/Games";
import Sports from "@mui/icons-material/Sports";
import Whatshot from "@mui/icons-material/Whatshot";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

interface ContainerProps {
  /**
   * Called, if the users clicks on a search suggestion.
   *
   * @param searchText The search text that the user clicked on.
   */
  onSuggestionClick: (searchText: string) => void;
}

/**
 * Renders a list of search suggestions that users can click on to ease the searching and exploring process.
 */
export const SearchSuggestions: React.FC<ContainerProps> = ({
  onSuggestionClick,
}) => {
  const { t } = useTranslation("SearchSuggestions");
  return (
    <Box>
      <List>
        {/* <ListSubheader disableSticky>Structure</ListSubheader> */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => onSuggestionClick(t("warmupSearch"))}>
            <ListItemIcon>
              <Whatshot sx={{ color: "orange" }} />
            </ListItemIcon>
            <ListItemText
              primary={t("warmupTitle")}
              secondary={t("warmupDescription")}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onSuggestionClick(t("exerciseSearch"))}
          >
            <ListItemIcon>
              <Sports sx={{ color: "blue" }} />
            </ListItemIcon>
            <ListItemText
              primary={t("exerciseTitle")}
              secondary={t("exerciseDescription")}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onSuggestionClick(t("gameSearch"))}>
            <ListItemIcon>
              <Games sx={{ color: "green" }} />
            </ListItemIcon>
            <ListItemText
              primary={t("gameTitle")}
              secondary={t("gameDescription")}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
