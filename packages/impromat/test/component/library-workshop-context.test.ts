import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";
import { randomUUID } from "crypto";

pageTest.describe("Library with Workshop Context", () => {
  pageTest(
    "should render the library page",
    async ({ auth, workshopPage, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto();
      await workshopPage.openLibrary();
      // then
      await libraryPage.expectToolbarTextToBe("Add Element");
      await expect(libraryPage.tabLocator(/Explore/)).toBeVisible();
      await expect(libraryPage.tabLocator(/Favorites/)).toBeVisible();
      await expect(libraryPage.tabLocator(/My Library/)).toBeVisible();
    },
  );

  pageTest(
    "should open an element",
    async ({ page, auth, workshopPage, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto();
      await workshopPage.openLibrary();
      // when
      await libraryPage.gotoElementFromSearch();
      // then
      await expect(
        page.getByRole("button", { name: "Add to Workshop" }),
      ).toBeVisible();
    },
  );

  pageTest(
    "should create a custom element and add it twice",
    async ({ page, auth, workshopPage, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto();
      await workshopPage.openLibrary();
      const uniqueElementName = `custom-element-${randomUUID()}`;
      // when
      await libraryPage.libraryTabLocator().click();
      await page.locator("ion-router-outlet ion-fab-button").last().click();
      await page.getByRole("textbox", { name: "Name" }).click();
      await page.getByRole("textbox", { name: "Name" }).fill(uniqueElementName);
      await page
        .getByRole("button", { name: "Create and Add to Workshop" })
        .click();
      await workshopPage.openLibrary();
      await libraryPage.libraryTabLocator().click();
      await libraryPage.openElementCard(uniqueElementName);
      await page.getByRole("button", { name: "Add to Workshop" }).click();
      await page.waitForTimeout(500); // db has to update
      // then
      expect(
        await page
          .locator("ion-router-outlet ion-item")
          .getByText(uniqueElementName)
          .count(),
      ).toBe(2);
    },
  );
});
