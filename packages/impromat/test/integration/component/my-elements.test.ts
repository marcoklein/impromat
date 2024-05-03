import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "../fixtures/page-fixtures.js";

pageTest.describe("My Elements", () => {
  pageTest(
    "create and show my elements",
    async ({ page, auth, libraryPage, accountPage }) => {
      // given
      await auth.loginAsRandomUser();
      const customElementName = `custom-element-${randomUUID()}`.slice(0, 40);
      await libraryPage.goto();
      await libraryPage.createCustomElement(customElementName);

      // when
      await accountPage.goto();
      await accountPage.myElementsButtonLocator.click();

      // then
      expect(page.url()).toContain("%40me"); // %40 is @
      await expect(libraryPage.searchInputLocator).toHaveValue("@me");
      await expect(page.getByText(customElementName)).toBeVisible();
    },
  );
});
