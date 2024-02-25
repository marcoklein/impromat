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
import { LibraryMenuDialog } from "./LibraryMenuDialog";

interface ComponentProps {
  searchText: string;
  setSearchText: (text: string) => void;
  /**
   * Called when the user presses the search button.
   */
  onSearch: (text: string) => void;
  queryIsFetching: boolean;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  reexecuteSearchElementsQuery: () => void;
  menuDialogOpen: boolean;
  setMenuDialogOpen: (open: boolean) => void;
}

export const LibraryPageAppBar: React.FC<ComponentProps> = ({
  searchText,
  onSearch,
  queryIsFetching,
  selectedLanguage,
  setSelectedLanguage,
  reexecuteSearchElementsQuery,
  menuDialogOpen,
  setMenuDialogOpen,
}) => {
  const { t } = useTranslation("LibraryPageAppBar");
  const [newSearchText, setNewSearchText] = useState(searchText);

  useEffect(() => {
    setNewSearchText(searchText);
  }, [searchText, setNewSearchText]);

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
              onSearch(newSearchText);
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
                    onClick={() => onSearch(newSearchText)}
                  >
                    <Search color="inherit" />
                  </IconButton>
                )
              )}
            </InputAdornment>
          }
        />
        <LibraryMenuDialog
          selectedLanguage={selectedLanguage}
          onSelectedLanguage={(language) => {
            setSelectedLanguage(language);
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
