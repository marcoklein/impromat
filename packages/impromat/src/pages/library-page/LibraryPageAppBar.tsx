import Clear from "@mui/icons-material/Clear";
import FilterList from "@mui/icons-material/FilterList";
import Search from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { useSearchParam } from "../../hooks/use-search-params";
import { ROUTE_LIBRARY_SEARCH_PARAM } from "../../routes/shared-routes";
import { LibraryMenuDialog } from "./LibraryMenuDialog";

interface ComponentProps {
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
  queryIsFetching,
  selectedLanguages,
  setSelectedLanguages,
  reexecuteSearchElementsQuery,
  menuDialogOpen,
  setMenuDialogOpen,
}) => {
  const { t } = useTranslation("LibraryPageAppBar");

  const searchParameterFromUrl = useSearchParam(ROUTE_LIBRARY_SEARCH_PARAM);

  const [searchText, setSearchText] = useState(searchParameterFromUrl ?? "");

  useEffect(() => {
    setSearchText(searchParameterFromUrl ?? "");
  }, [searchParameterFromUrl]);

  const history = useHistory();

  const onSearch = (searchText: string) => {
    if (searchText !== searchParameterFromUrl) {
      const params = new URLSearchParams();
      params.append(ROUTE_LIBRARY_SEARCH_PARAM, searchText);
      history.push({ search: params.toString() });
    }
  };

  return (
    <Box mt={1} mx={1}>
      <ResponsiveContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 0.5,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
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
              startAdornment={
                <InputAdornment position="start" sx={{ color: "inherit" }}>
                  <Search />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end" sx={{ color: "inherit" }}>
                  {queryIsFetching ? (
                    <IconButton color="inherit">
                      <CircularProgress
                        size={24}
                        color="inherit"
                      ></CircularProgress>
                    </IconButton>
                  ) : searchText !== searchParameterFromUrl ? (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => onSearch(searchText)}
                    >
                      {t("search")}
                    </Button>
                  ) : (
                    searchText !== "" && (
                      <IconButton
                        onClick={() => {
                          setSearchText("");
                          onSearch("");
                        }}
                        color="inherit"
                      >
                        <Clear />
                      </IconButton>
                    )
                  )}
                </InputAdornment>
              }
            />
          </Paper>
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
        </Box>
      </ResponsiveContainer>
    </Box>
  );
};
