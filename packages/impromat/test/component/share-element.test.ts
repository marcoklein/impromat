import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Shared Elements", () => {
  pageTest(
    "shared element flow",
    async ({ page, auth, libraryPage, accountPage, libraryElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      const uniqueElementName = randomUUID();
      await pageTest.step("should create a shared element", async () => {
        await libraryPage.goto();
        await libraryPage.createCustomElement(uniqueElementName, {
          isPublic: true,
        });
        await accountPage.goto();
        await accountPage.logout();
        await auth.loginAsRandomUser();
      });

      await pageTest.step(
        "should open shared element of other user",
        async () => {
          // when
          await libraryPage.gotoSearch();
          await libraryPage.searchForElement(uniqueElementName);
          await libraryPage.openElementCard(uniqueElementName);
          // then
          await expect(
            page.getByText("Created by a user in impromat"),
          ).toBeVisible();
        },
      );

      await pageTest.step(
        "should like a shared element of other user",
        async () => {
          await libraryElementPage.addToLikedElements();
          await libraryElementPage.backButtonLocator.click();
          await libraryPage.searchForElement(uniqueElementName);
          await libraryPage.openElementCard(uniqueElementName);
          // then
          await expect(
            libraryElementPage.removeFromLikesButtonLocator,
          ).toBeVisible();
        },
      );
    },
  );
});
