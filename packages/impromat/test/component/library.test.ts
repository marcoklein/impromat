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
        await page.waitForTimeout(1000);
        // then
        await expect(page.getByText(new RegExp(name))).toBeVisible();
      });

      await pageTest.step("should show custom elements in search", async () => {
        // when
        await libraryPage.gotoSearch();
        await libraryPage.searchForElement(name);
        // then
        await expect(page.getByText(name)).toBeVisible();
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
      // then
      await expect(page).toHaveScreenshot({
        animations: "disabled",
        maxDiffPixelRatio: 0.01,
      });
      await expect(page.getByText("Freeze Tag-Exercise")).toBeVisible();
    },
  );
});
