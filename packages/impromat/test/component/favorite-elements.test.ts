import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Favorite Elements", () => {
  pageTest(
    "should add a favorite element",
    async ({ page, auth, libraryElementPage, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoElementFromSearch();
      // when
      await libraryElementPage.addToFavoriteElements();
      await libraryPage.gotoFavorites();
      // then
      await expect(page.getByText("Freeze").first()).toBeVisible();
    },
  );
  pageTest(
    "should remove a favorite element",
    async ({ page, auth, libraryPage, libraryElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoElementFromSearch();
      await libraryElementPage.addToFavoriteElements();
      // when
      await libraryElementPage.removeFromFavoriteElements();
      await libraryPage.gotoFavorites();
      // then
      await expect(
        page.locator("p").getByText("No favorites yet."),
      ).toBeVisible();
    },
  );
});
