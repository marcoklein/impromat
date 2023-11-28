import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Shared Elements", () => {
  pageTest(
    "should create a shared element",
    async ({ page, auth, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      const uniqueElementName = randomUUID();
      // when
      await libraryPage.goto();
      await libraryPage.createCustomElement(uniqueElementName, {
        isPublic: true,
      });
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoSearch();

      await libraryPage.searchForElement(uniqueElementName);
      await libraryPage.openElementCard(uniqueElementName);
      // then
      await expect(
        page.getByText("Created by a user in impromat"),
      ).toBeVisible();
    },
  );

  pageTest(
    "should favorise a user created element",
    async ({ page, auth, libraryPage, libraryElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      const uniqueElementName = randomUUID();
      // when
      await libraryPage.goto();
      await libraryPage.createCustomElement(uniqueElementName, {
        isPublic: true,
      });
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.gotoSearch();

      await libraryPage.searchForElement(uniqueElementName);
      await libraryPage.openElementCard(uniqueElementName);
      await libraryElementPage.addToLikedElements();
      await libraryElementPage.clickBackButton();
      await libraryPage.clearSearch();
      await libraryPage.toggleLikedFilter();
      // then
      await expect(page.getByText(uniqueElementName)).toBeVisible();
    },
  );
});
