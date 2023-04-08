import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "./fixtures/page-fixtures";

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
      await libraryPage.searchForElement(uniqueElementName);
      await page.getByText(uniqueElementName).click();
      // then
      await expect(
        page.getByText("Created by a user in impromat"),
      ).toBeVisible();
    },
  );

  pageTest(
    "should favorise a user created element",
    async ({ page, auth, libraryPage, favoriteElementsPage, workshopPage }) => {
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
      await libraryPage.searchForElement(uniqueElementName);
      await page.getByText(uniqueElementName).click();
      await workshopPage.addToFavoriteElements();
      await favoriteElementsPage.goto();
      // then
      await expect(page.getByText(uniqueElementName)).toBeVisible();
    },
  );
});
