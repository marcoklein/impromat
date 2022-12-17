import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Library", () => {
  pageTest.beforeEach(async ({ libraryPage }) => {
    await libraryPage.goto();
  });

  pageTest("should render the library page", async ({ page, libraryPage }) => {
    // then
    await libraryPage.expectToolbarTextToBe("Element Library");
    await expect(libraryPage.tabLocator("Search Explore")).toBeVisible();
    await expect(libraryPage.tabLocator("Star Favorites")).toBeVisible();
    await expect(libraryPage.tabLocator(/Create/)).toBeHidden();
  });
});
