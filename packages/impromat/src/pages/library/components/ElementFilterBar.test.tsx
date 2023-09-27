import { expect, test } from "@playwright/experimental-ct-react";
import { makeFragmentData } from "../../../graphql-client";
import {
  ElementFilterBar_QueryFragment,
  ElementFilterBar_QueryFragmentDoc,
} from "../../../graphql-client/graphql";
import { ElementFilterBar } from "./ElementFilterBar";

test.describe("ElementFilterBar", () => {
  // given
  const elementFilterBarFragment: ElementFilterBar_QueryFragment = {
    tags: [{ id: "first-tag-id", name: "test-tag-game" }],
  };
  const fragmentData = makeFragmentData(
    elementFilterBarFragment,
    ElementFilterBar_QueryFragmentDoc,
  );
  test("should have test tag game in component", async ({ mount }) => {
    // when
    const component = await mount(
      <ElementFilterBar
        queryFragment={fragmentData}
        loadingAvailableTags={false}
        onTagsChange={() => {}}
        selectedTagNames={[]}
        additionalFilter={{ liked: false, userCreated: false }}
        onAdditionalFilterChange={() => {}}
        onLanguageChange={() => {}}
        selectedLanguage="en"
      ></ElementFilterBar>,
    );
    // then
    await expect(component).toContainText("test-tag-game");
  });
});
