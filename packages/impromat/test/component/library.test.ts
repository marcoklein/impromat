import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Library", () => {
  pageTest(
    "basic flow",
    async ({ page, auth, libraryPage, libraryElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      const name = "test-custom-element";

      await pageTest.step("should open an element", async () => {
        // when
        await libraryPage.gotoFirstElementFromSearch();
        // then
        await expect(
          page.getByRole("heading", { name: "Freeze" }),
        ).toBeVisible();
      });

      await pageTest.step("should create a custom element", async () => {
        // when
        await libraryPage.goto();
        await libraryPage.createCustomElement(name);
        // then
        await expect(page.getByText(new RegExp(name))).toBeVisible();
      });

      await pageTest.step("should show custom elements in search", async () => {
        // when
        await libraryPage.gotoSearch();
        await libraryPage.searchForElement("Freeze Tag-Exercise");
        // then
        await expect(page.getByText(new RegExp(name))).toBeVisible();
      });
    },
  );

  pageTest(
    "should restore scroll position after navigating back",
    async ({ page, auth, libraryPage, libraryElementPage }) => {
      // given
      await auth.loginAsRandomUser();
      // when
      await libraryPage.searchForElement("freeze");
      await libraryPage.scrollDownInElementsList();
      await libraryPage.openElementCard("Freeze Tag-Exercise");
      await libraryElementPage.backButtonLocator.click();
      await page.waitForTimeout(500);
      // then
      await expect(
        page.getByRole("heading", { name: "Freeze Tag-Exercise" }),
      ).toBeVisible();
      await expect(page).toHaveScreenshot({
        animations: "disabled",
        fullPage: true,
      });
    },
  );
});
