import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Liked Elements", () => {
  pageTest(
    "should add a liked element",
    async ({ page, auth, libraryElementPage, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoFirstElementFromSearch();
      // when
      await libraryElementPage.addToLikedElements();
      await libraryPage.gotoLikedElements();
      // then
      await expect(page.getByText("Freeze").first()).toBeVisible();
    },
  );

  pageTest(
    "should immediately update the liked icon if the liked state is changed through cached version",
    async ({ page, auth, libraryElementPage, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoFirstElementFromSearch();
      // ensure page is not refreshed to use cached library state
      await page.getByRole("button", { name: "back" }).click();
      await libraryPage.gotoFirstElementFromSearch();
      // when
      await libraryElementPage.addToLikedElements();
      // then
      await expect(
        libraryElementPage.removeFromLikesButtonLocator,
        "Liked icon state did not update.",
      ).toBeVisible();
    },
  );

  pageTest(
    "should remove a liked element",
    async ({ page, auth, libraryPage, libraryElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoFirstElementFromSearch();
      await libraryElementPage.addToLikedElements();
      // when
      await libraryElementPage.removeFromLikedElements();
      await libraryPage.gotoLikedElements();
      // then
      await expect(
        page.getByText(
          "Use the search bar to find elements from various sources.",
        ),
      ).toBeVisible();
    },
  );
});
