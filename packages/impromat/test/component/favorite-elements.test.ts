import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Favorite Elements", () => {
  pageTest(
    "should verify favorites process",
    async ({ page, workshopPage }) => {
      await pageTest.step("should add a favorite element", async () => {
        // given
        await workshopPage.createAndGoto();
        await workshopPage.gotoElementFromSearch();
        // when
        await page
          .locator('ion-button:has-text("Star")')
          .getByRole("button")
          .click();
        await page.getByRole("button", { name: "back" }).click();
        await page.getByRole("tab", { name: "Star Favorites" }).click();
        // then
        await expect(
          page
            .locator("*")
            .getByText("improwikiDEFreeze TagKettenspieleSwitches")
            .first(),
        ).toBeVisible();
      });

      await pageTest.step("should remove a favorite element", async () => {
        // given previous step
        // when
        await page.getByRole("tab", { name: "Search Explore" }).click();
        await page
          .getByText("improwikiDEFreeze TagKettenspieleSwitches")
          .click();
        await page
          .locator('ion-button:has-text("Star")')
          .getByRole("button")
          .click();
        await page.getByRole("button", { name: "back" }).click();
        await page.getByRole("tab", { name: "Star Favorites" }).click();
        // then
        await expect(
          page.locator("p").getByText("No favorites yet."), //':has-text("No favorites yet.")'),
        ).toBeVisible();
      });
    },
  );
});