import type { Meta } from "@storybook/react";
import { LibraryPageAppBar } from "./LibraryPageAppBar";

const meta: Meta<typeof LibraryPageAppBar> = {
  component: LibraryPageAppBar,
  tags: ["autodocs"],
  args: {
    searchText: "",
    setSearchText: () => {},
    onSearch: () => {},
    queryIsFetching: false,
    selectedLanguages: [],
    setSelectedLanguages: () => {},
    reexecuteSearchElementsQuery: () => {},
    menuDialogOpen: false,
    setMenuDialogOpen: () => {},
  },
};

export default meta;

export const Default = () => (
  <LibraryPageAppBar
    searchText=""
    setSearchText={() => {}}
    onSearch={() => {}}
    queryIsFetching={false}
    selectedLanguages={[]}
    setSelectedLanguages={() => {}}
    reexecuteSearchElementsQuery={() => {}}
    menuDialogOpen={false}
    setMenuDialogOpen={() => {}}
  />
);
