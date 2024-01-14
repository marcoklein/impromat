import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Library", () => {
  pageTest("should open an element", async ({ page, auth, libraryPage }) => {
    // given
    await auth.loginAsRandomUser();
    await libraryPage.goto();
    // when
    await libraryPage.gotoFirstElementFromSearch();
    // then
    await libraryPage.expectToolbarTextToBe("Freeze");
  });

  pageTest(
    "should create a custom element",
    async ({ page, auth, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      const name = "test-custom-element";
      // when
      await libraryPage.goto();
      await libraryPage.createCustomElement(name);
      await libraryPage.goto();
      await libraryPage.clickMyElementsFilter();
      // then
      await expect(page.getByText(new RegExp(name))).toBeVisible();
    },
  );

  pageTest(
    "should show custom elements in search",
    async ({ page, auth, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      const name = "test-custom-element";
      await libraryPage.goto();
      await libraryPage.createCustomElement(name);
      // when
      await libraryPage.gotoSearch();
      await libraryPage.searchForElement(name);
      // then
      await expect(page.getByText(new RegExp(name))).toBeVisible();
    },
  );

  pageTest(
    "should restore scroll position after navigating back",
    async ({ page, auth, libraryPage, libraryElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      // when
      await libraryPage.goto();
      await libraryPage.searchForElement("freeze");
      await libraryPage.scrollDownInElementsList();
      await page.getByRole("heading", { name: "Freeze Tag-Exercise" }).click();
      await libraryElementPage.clickBackButton();
      await page
        .getByRole("heading", { name: "Freeze Tag-Exercise" })
        .waitFor();
      // then
      await expect(page).toHaveScreenshot({
        animations: "disabled",
        fullPage: true,
      });
    },
  );
});
