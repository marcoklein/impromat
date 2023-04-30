import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Favorite Elements", () => {
  pageTest(
    "should add a favorite element",
    async ({ page, auth, libraryElementPage, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoFirstElementFromSearch();
      // when
      await libraryElementPage.addToFavoriteElements();
      await libraryPage.gotoFavorites();
      // then
      await expect(page.getByText("Freeze").first()).toBeVisible();
    },
  );

  pageTest(
    "should immediately update the favorite icon if the favorite state is changed through cached version",
    async ({ page, auth, libraryElementPage, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoFirstElementFromSearch();
      // ensure page is not refreshed to use cached library state
      await page.getByRole("button", { name: "back" }).click();
      await libraryPage.gotoFirstElementFromSearch();
      // when
      await libraryElementPage.addToFavoriteElements();
      // then
      await expect(
        libraryElementPage.removeFromFavoritesButtonLocator,
        "Favorite icon state did not update.",
      ).toBeVisible();
    },
  );

  pageTest(
    "should remove a favorite element",
    async ({ page, auth, libraryPage, libraryElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoFirstElementFromSearch();
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
