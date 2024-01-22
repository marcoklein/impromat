import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Library with Workshop Context", () => {
  pageTest(
    "should render the library page",
    async ({
      auth,
      workshopPage,
      workshopsPage,
      page,
      libraryPage,
      workshopElementPage,
    }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      const workshopName = `Test Workshop ${randomUUID()}`;
      await workshopPage.createAndGoto(workshopName);

      await pageTest.step("should render the library page", async () => {
        // when
        await workshopPage.openLibrary();
        // then
        await expect(page).toHaveURL(/.*\/nav\/elements/);
      });

      await pageTest.step("should add Freeze to workshop", async () => {
        // when
        await libraryPage.gotoFirstElementFromSearch();
        await workshopElementPage.addToWorkshop(workshopName);
        // then
        await expect(
          workshopPage.getElementByNameLocator("Freeze"),
        ).toBeVisible();
      });
    },
  );

  // TODO https://github.com/marcoklein/impromat/issues/254
  pageTest.skip(
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
      await page
        .getByRole("button", { name: "Add to workshop", exact: true })
        .click();
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
