import { ElementSearchInput } from "../../graphql-client/graphql";

/**
 * Parse the search input text and returns a parsed search input that can be used to send a backend request.
 *
 * @param searchText Search text to parse.
 * @returns Parsed search input.
 */
export function parseSearchInput(searchText: string): ElementSearchInput {
  let ownElement: boolean | undefined = undefined;
  if (searchText.includes("@me")) {
    ownElement = true;
    searchText = searchText.replace("@me", "").trim();
  }
  return {
    text: searchText,
    ownElement,
  };
}
