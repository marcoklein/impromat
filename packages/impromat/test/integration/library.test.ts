import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Library", () => {
  pageTest("should render the library page", async ({ page, libraryPage }) => {
    // when
    await libraryPage.goto();
    // then
    await libraryPage.expectToolbarTextToBe("Element Library");
    await expect(libraryPage.tabLocator("Search Explore")).toBeVisible();
    await expect(libraryPage.tabLocator("Star Favorites")).toBeVisible();
    await expect(libraryPage.tabLocator(/Custom/)).toBeVisible();
  });

  pageTest("should open an element", async ({ page, libraryPage }) => {
    // given
    await libraryPage.goto();
    // when
    await libraryPage.gotoElementFromSearch();
    // then
    expect(page.url()).toContain(
      "/library-element/a74ac20adeba66b0044143630cba90ab",
    );
  });

  pageTest("should create a custom element", async ({ page, libraryPage }) => {
    // given
    const name = "test-custom-element";
    // when
    await libraryPage.createCustomElement(name);
    // then
    await expect(page.getByText(new RegExp(name))).toBeVisible();
  });

  pageTest(
    "should show custom elements in search",
    async ({ page, libraryPage }) => {
      // given
      const name = "test-custom-element";
      await libraryPage.createCustomElement(name);
      // when
      await libraryPage.tabLocator(/Search/).click();
      await libraryPage.searchForElement(name);
      // then
      await expect(page.getByText(new RegExp(name))).toBeVisible();
    },
  );
});
