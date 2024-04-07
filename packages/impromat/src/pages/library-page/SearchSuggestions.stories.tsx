import type { Meta } from "@storybook/react";
import { SearchSuggestions } from "./SearchSuggestions";

const meta: Meta<typeof SearchSuggestions> = {
  component: SearchSuggestions,
  tags: ["autodocs"],
};

export default meta;

export const Default = () => (
  <SearchSuggestions
    onSuggestionClick={function (searchText: string): void {
      throw new Error("Function not implemented.");
    }}
  />
);
