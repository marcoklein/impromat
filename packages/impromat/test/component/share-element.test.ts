import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Shared Elements", () => {
  pageTest(
    "should add a custom element",
    async ({ page, auth, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      const randomElementName = `my-custom-element-${Math.round(
        Math.random() * 10000000000,
      )}`;
      // when
      await libraryPage.goto();
      await libraryPage.createCustomElement(randomElementName, {
        isPublic: true,
      });
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.searchForElement(randomElementName);
      // then
      await expect(page.getByText(randomElementName)).toBeVisible();
    },
  );
});
