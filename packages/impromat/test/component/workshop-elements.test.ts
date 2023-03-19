import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Workshop Elements Page", () => {
  pageTest(
    "should add an element from the search",
    async ({ page, auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("workshop name");
      // when
      await workshopPage.addElementFromSearch();
      // then
      await expect(page.getByRole("heading").getByText("Freeze")).toBeVisible();
    },
  );

  pageTest(
    "should have element title in toolbar",
    async ({ page, auth, workshopElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      // when
      await workshopElementPage.createAndGoto();
      // then
      await expect(page.locator("ion-title").getByText("Freeze")).toBeVisible();
    },
  );

  pageTest(
    "should add a note to a workshop element",
    async ({ page, auth, workshopElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      const noteText = "My Note";
      await workshopElementPage.createAndGoto();
      // when
      await page
        .locator('ion-button:has-text("DocumentAdd Note")')
        .getByRole("button")
        .click();
      await page.locator("textarea").click();
      await page.locator("textarea").fill(noteText);
      await page.getByRole("button", { name: "Save" }).click();
      // then
      await page.waitForSelector(
        `ion-item[role="listitem"]:has-text("${noteText}Pencil") >> role=paragraph`,
      );
    },
  );

  pageTest(
    "should show license attribution of element",
    async ({ page, auth, workshopElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      // when
      await workshopElementPage.createAndGoto();
      // then
      await expect(page.getByText("Based on")).toBeVisible();
    },
  );
});
