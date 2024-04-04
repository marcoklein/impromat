import { FilterList, Search } from "@mui/icons-material";
import {
  AppBar,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputBase,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../hooks/use-debounce";
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
  onSearch,
  queryIsFetching,
  selectedLanguages,
  setSelectedLanguages,
  reexecuteSearchElementsQuery,
  menuDialogOpen,
  setMenuDialogOpen,
}) => {
  const { t } = useTranslation("LibraryPageAppBar");
  const [newSearchText, setNewSearchText] = useState(searchText);
  const [triggerNow, setTriggerNow] = useState<number>(0);
  const debouncedSearchText = useDebounce(newSearchText, 500, triggerNow);

  useEffect(() => {
    onSearch(debouncedSearchText);
  }, [debouncedSearchText, onSearch]);

  useEffect(() => {
    setNewSearchText(searchText);
  }, [searchText]);

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
          value={newSearchText}
          onChange={(event) => setNewSearchText(event.target.value)}
          aria-label="search-input"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setTriggerNow((current) => current + 1);
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
                newSearchText !== searchText && (
                  <IconButton
                    color="inherit"
                    onClick={() => setTriggerNow((current) => current + 1)}
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
