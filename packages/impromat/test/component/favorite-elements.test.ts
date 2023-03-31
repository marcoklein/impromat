import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Favorite Elements", () => {
  pageTest(
    "should add a favorite element",
    async ({ page, auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto();
      await workshopPage.gotoElementFromSearch();
      // when
      await workshopPage.addToFavoriteElements();
      await page.getByRole("button", { name: "back" }).click();
      await page.getByText("StarFavorites").click();
      // then
      await expect(page.getByText("Freeze").first()).toBeVisible();
    },
  );
  pageTest(
    "should remove a favorite element",
    async ({ page, auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto();
      await workshopPage.gotoElementFromSearch();
      await workshopPage.addToFavoriteElements();
      // when
      await workshopPage.removeFromFavoriteElements();
      await page.getByRole("button", { name: "back" }).click();
      await page.getByText("StarFavorites").click();
      // then
      await expect(
        page.locator("p").getByText("No favorites yet."),
      ).toBeVisible();
    },
  );
});
