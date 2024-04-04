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

      await pageTest.step("should add a liked element", async () => {
        // when
        await libraryElementPage.addToLikedElements();
        // then
        await expect(
          libraryElementPage.removeFromLikesButtonLocator,
        ).toBeVisible();
      });
      await pageTest.step("should remove a liked element", async () => {
        // when
        await libraryElementPage.removeFromLikedElements();
        // then
        await expect(libraryElementPage.addToLikesButtonLocator).toBeVisible();
      });
    },
  );
});
