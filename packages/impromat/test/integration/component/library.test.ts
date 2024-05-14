import { expect } from "@playwright/test";
import { pageTest } from "../fixtures/page-fixtures.js";

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
      await libraryPage.goto();
      const bottomLocator = page.locator('.virtuoso-list div[data-index="4"]');
      await pageTest.step("should search for games", async () => {
        // when
        await libraryPage.searchForElement("#game");
      });
      await pageTest.step("should scroll to the bottom", async () => {
        // when
        await page.mouse.move(150, 150);
        await page.mouse.wheel(0, 400);
        // then
        await expect(bottomLocator).toBeInViewport();
      });
      await pageTest.step(
        "should navigate back and restore scroll position",
        async () => {
          // when
          await bottomLocator.click();
          await page.waitForTimeout(300);
          await libraryElementPage.backButtonLocator.waitFor();
          await page.waitForTimeout(500);
          await libraryElementPage.backButtonLocator.click();
          await page.waitForTimeout(500);
          // then
          await expect(bottomLocator).toBeInViewport();
        },
      );
    },
  );

  pageTest(
    "should load more elements when scrolling to the bottom",
    async ({ page, auth, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      await libraryPage.goto();
      await libraryPage.searchForElement("#game");
      // when
      await page.mouse.move(150, 150);
      await page.waitForTimeout(300);
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(300);
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(300);
      await page.mouse.wheel(0, 1000);
      await page.waitForTimeout(300);
      await page.mouse.wheel(0, 200);
      await page
        .locator('.virtuoso-list div[data-index="27"]')
        .scrollIntoViewIfNeeded();
      // then
      await expect(
        page.locator('.virtuoso-list div[data-index="27"]'),
      ).toBeInViewport();
    },
  );
});
