import { FilterList, Search } from "@mui/icons-material";
import {
  AppBar,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputBase,
  Toolbar,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LibraryMenuDialog } from "./LibraryMenuDialog";

interface ComponentProps {
  searchText: string;
  setSearchText: (text: string) => void;
  queryIsFetching: boolean;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  reexecuteSearchElementsQuery: () => void;
  menuDialogOpen: boolean;
  setMenuDialogOpen: (open: boolean) => void;
}

export const MuiLibraryPageAppBar: React.FC<ComponentProps> = ({
  searchText,
  setSearchText,
  queryIsFetching,
  selectedLanguage,
  setSelectedLanguage,
  reexecuteSearchElementsQuery,
  menuDialogOpen,
  setMenuDialogOpen,
}) => {
  const { t } = useTranslation("MuiLibraryPageAppBar");
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
          sx={{ ml: 1, flex: 1, color: "inherit" }}
          placeholder={t("searchPlaceholder")}
          inputProps={{
            "aria-label": t("searchAriaLabel"),
          }}
          startAdornment={
            <InputAdornment position="start" sx={{ color: "inherit" }}>
              {queryIsFetching ? (
                <CircularProgress size={24} color="inherit"></CircularProgress>
              ) : (
                <Search color="inherit" />
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
