import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Workshop Elements Page", () => {
  pageTest(
    "should add an element from the search",
    async ({ page, workshopPage }) => {
      // given
      await workshopPage.createAndGoto("workshop name");
      // when
      await workshopPage.addElementFromSearch();
      // then
      await page.waitForSelector(`role=heading[name="Freeze Tag"]`);
    },
  );

  pageTest(
    "should have element title in toolbar",
    async ({ page, workshopElementPage }) => {
      // given
      // when
      await workshopElementPage.createAndGoto();
      // then
      await page.waitForSelector('ion-title:has-text("Freeze Tag") div');
    },
  );

  pageTest(
    "should rename a workshop element",
    async ({ page, workshopElementPage }) => {
      // given
      const newTitle = "Renamed Element";
      await workshopElementPage.createAndGoto();
      // when
      await page
        .locator('ion-button:has-text("Pencil")')
        .getByRole("button")
        .click();
      await page.locator('input[type="text"]').fill(newTitle);
      await page.getByRole("button", { name: "Save" }).click();
      // then
      await page.waitForSelector(`ion-title:has-text("${newTitle}") div`);
    },
  );

  pageTest(
    "should add note to workshop element",
    async ({ page, workshopElementPage }) => {
      // given
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
    async ({ page, workshopElementPage }) => {
      // given
      await workshopElementPage.createAndGoto();
      // when
      // then
      await page.waitForSelector('p:has-text("Based on")');
      const element = page.getByText(
        /Based\s+on\s+"Freeze\s+Tag"\s+by\s+improwiki\s+and\s+licensed\s+under\s+CC\s+BY-SA\s+3\.0\s+DE/,
      );
      expect(await element.count()).toBe(1);
    },
  );
});
