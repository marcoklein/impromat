import FilterList from "@mui/icons-material/FilterList";
import Search from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import { useTranslation } from "react-i18next";
import { LibraryMenuDialog } from "./LibraryMenuDialog";

interface ComponentProps {
  /**
   * The current search text.
   */
  searchText: string;
  setSearchText: (text: string) => void;
  /**
   * Called when the user presses the search button.
   */
  onSearch: (text: string) => void;
  queryIsFetching: boolean;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  reexecuteSearchElementsQuery: () => void;
  menuDialogOpen: boolean;
  setMenuDialogOpen: (open: boolean) => void;
}

/**
 * Search functionality for elements in the library.
 */
export const LibraryPageAppBar: React.FC<ComponentProps> = ({
  searchText,
  setSearchText,
  onSearch,
  queryIsFetching,
  selectedLanguages,
  setSelectedLanguages,
  reexecuteSearchElementsQuery,
  menuDialogOpen,
  setMenuDialogOpen,
}) => {
  const { t } = useTranslation("LibraryPageAppBar");

  return (
    <AppBar
      sx={{
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
      }}
      position="static"
    >
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <InputBase
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          aria-label="search-input"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onSearch(searchText);
            }
          }}
          sx={{ ml: 1, flex: 1, color: "inherit" }}
          placeholder={t("searchPlaceholder")}
          inputProps={{
            "aria-label": t("searchAriaLabel"),
          }}
          endAdornment={
            <InputAdornment position="end" sx={{ color: "inherit" }}>
              {queryIsFetching ? (
                <IconButton color="inherit">
                  <CircularProgress
                    size={24}
                    color="inherit"
                  ></CircularProgress>
                </IconButton>
              ) : (
                searchText && (
                  <IconButton
                    color="inherit"
                    onClick={() => onSearch(searchText)}
                  >
                    <Search color="inherit" />
                  </IconButton>
                )
              )}
            </InputAdornment>
          }
        />
        <LibraryMenuDialog
          selectedLanguages={selectedLanguages}
          onSelectedLanguages={(languages) => {
            setSelectedLanguages(languages);
            reexecuteSearchElementsQuery();
          }}
          open={menuDialogOpen}
          onClose={() => setMenuDialogOpen(false)}
        ></LibraryMenuDialog>
        <IconButton color="inherit" onClick={() => setMenuDialogOpen(true)}>
          <FilterList></FilterList>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
