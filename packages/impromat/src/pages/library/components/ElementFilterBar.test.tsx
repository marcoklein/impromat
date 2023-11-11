import { expect, test } from "@playwright/experimental-ct-react";
import { Locator } from "@playwright/test";
import { makeFragmentData } from "../../../graphql-client";
import {
  ElementFilterBar_QueryFragment,
  ElementFilterBar_QueryFragmentDoc,
} from "../../../graphql-client/graphql";
import { ElementFilterBar } from "./ElementFilterBar";

test.describe("ElementFilterBar", () => {
  // given
  const elementFilterBarFragment: ElementFilterBar_QueryFragment = {
    tags: [{ id: "first-tag-id", name: "test-tag-game", count: 4711 }],
  };
  const fragmentData = makeFragmentData(
    elementFilterBarFragment,
    ElementFilterBar_QueryFragmentDoc,
  );

  test.describe("given rendered component", () => {
    let component: Locator;

    test.beforeAll(async ({ mount }) => {
      // when
      component = await mount(
        <ElementFilterBar
          queryFragment={fragmentData}
          loadingAvailableTags={false}
          onTagsChange={() => {}}
          selectedTagNames={[]}
          additionalFilter={{ liked: false, userCreated: false }}
          onAdditionalFilterChange={() => {}}
          onLanguageChange={() => {}}
          selectedLanguage="en"
          isExpanded={false}
          onSearchInputChange={() => {}}
          searchInput=""
        ></ElementFilterBar>,
      );
    });

    test("should have test tag game in component", async () => {
      // then
      await expect(component).toContainText("test-tag-game");
    });

    test("should render tag occurrence count", async () => {
      // then
      await expect(component).toContainText("4711");
    });

    test("should have expected screenshot", async () => {
      // then
      await expect(component).toHaveScreenshot();
    });
  });
});
