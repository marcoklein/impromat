import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Library", () => {
  pageTest.beforeEach(async ({ libraryPage }) => {
    // when
    await libraryPage.goto();
  });

  pageTest("should render the library page", async ({ page, libraryPage }) => {
    // then
    await libraryPage.expectToolbarTextToBe("Element Library");
    await expect(libraryPage.tabLocator("Search Explore")).toBeVisible();
    await expect(libraryPage.tabLocator("Star Favorites")).toBeVisible();
    await expect(libraryPage.tabLocator(/Custom/)).toBeVisible();
  });

  pageTest("should open an element", async ({ page, libraryPage }) => {
    // when
    await libraryPage.gotoElementFromSearch();
    // then
    expect(page.url()).toContain(
      "/library-element/a74ac20adeba66b0044143630cba90ab",
    );
  });
});
