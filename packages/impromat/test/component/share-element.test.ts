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
  // TODO test cases: what happens when user unshares? What happens if other user has it in workshop already and the author unpublishes?
});
