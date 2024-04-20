import Delete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useTranslation } from "react-i18next";

interface ContainerProps {
  /**
   * Called, if the users clicks on a search suggestion.
   *
   * @param searchText The search text that the user clicked on.
   */
  onSuggestionClick: (searchText: string) => void;
  latestSearches: string[];
  onClearHistory: () => void;
}

/**
 * Renders a list of search suggestions that users can click on to ease the searching and exploring process.
 */
export const SearchSuggestions: React.FC<ContainerProps> = ({
  onSuggestionClick,
  latestSearches,
  onClearHistory,
}) => {
  const { t } = useTranslation("SearchSuggestions");
  return (
    <Box>
      <List>
        {latestSearches.length > 0 && (
          <ListSubheader sx={{ display: "flex" }}>
            {t("history")}
            <IconButton sx={{ marginLeft: "auto" }} onClick={onClearHistory}>
              <Delete />
            </IconButton>
          </ListSubheader>
        )}
        {latestSearches.map((searchText) => (
          <ListItem key={searchText} disablePadding>
            <ListItemButton onClick={() => onSuggestionClick(searchText)}>
              <ListItemText primary={searchText} />
            </ListItemButton>
          </ListItem>
        ))}
        {latestSearches.length === 0 && (
          <>
            <ListSubheader>{t("suggestions")}</ListSubheader>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onSuggestionClick(t("warmupSearch"))}
              >
                <ListItemText primary={t("warmupSearch")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onSuggestionClick(t("exerciseSearch"))}
              >
                <ListItemText primary={t("exerciseSearch")} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => onSuggestionClick(t("gameSearch"))}
              >
                <ListItemText primary={t("gameSearch")} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </Box>
  );
};
