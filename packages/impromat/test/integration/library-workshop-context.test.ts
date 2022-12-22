import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Library with Workshop Context", () => {
  pageTest(
    "should render the library page",
    async ({ workshopPage, libraryPage }) => {
      // given
      await workshopPage.createAndGoto();
      await workshopPage.openLibrary();
      // then
      await libraryPage.expectToolbarTextToBe("Add Element");
      await expect(libraryPage.tabLocator("Search Explore")).toBeVisible();
      await expect(libraryPage.tabLocator("Star Favorites")).toBeVisible();
      await expect(libraryPage.tabLocator(/Custom/)).toBeVisible();
    },
  );

  pageTest(
    "should open an element",
    async ({ page, workshopPage, libraryPage }) => {
      // given before each
      await workshopPage.createAndGoto();
      await workshopPage.openLibrary();
      // when
      await libraryPage.gotoElementFromSearch();
      // then
      await expect(
        page.getByRole("button", { name: "Add to Workshop" }),
      ).toBeVisible();
      expect(page.url()).toContain(
        "/library-element/a74ac20adeba66b0044143630cba90ab",
      );
    },
  );

  pageTest(
    "should create a custom element and add it twice",
    async ({ page, workshopPage }) => {
      // given
      await workshopPage.createAndGoto();
      await workshopPage.openLibrary();
      // when
      await page.getByRole("tab", { name: "Brush Custom" }).click();
      await page
        .locator("ion-content")
        .filter({
          hasText:
            "AddCloseYour Individual ElementsYou cannot find the improv exercise or game that",
        })
        .locator("path")
        .nth(1)
        .click();
      await page.getByRole("textbox", { name: "Name" }).click();
      await page.getByRole("textbox", { name: "Name" }).fill("test-element");
      await page
        .getByRole("button", { name: "Create and Add to Workshop" })
        .click();
      await workshopPage.openLibrary();
      await page.getByRole("tab", { name: "Brush Custom" }).click();
      await page.getByRole("listitem").getByText("test-element").click();
      await page.getByRole("button", { name: "Add to Workshop" }).click();
      // then
      expect(
        await page
          .locator("ion-router-outlet ion-item")
          .getByText("test-element")
          .count(),
      ).toBe(2);
    },
  );
});
