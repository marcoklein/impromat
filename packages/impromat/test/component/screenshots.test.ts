import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe.configure({ mode: "parallel" });
pageTest.describe("Screenshots", () => {
  pageTest.beforeEach(async ({ auth }) => {
    // given
    await auth.loginAsRandomUser();
  });

  pageTest("accountPage", async ({ page, accountPage }) => {
    // when
    await accountPage.goto();
    // then
    await expect(page).toHaveScreenshot();
  });

  pageTest("homePage", async ({ page, homePage }) => {
    // when
    await homePage.goto();
    // then
    await expect(page).toHaveScreenshot();
  });

  pageTest("libraryPage", async ({ page, libraryPage }) => {
    // when
    await libraryPage.goto();
    await page.waitForTimeout(1000);
    // then
    await expect(page).toHaveScreenshot();
  });

  pageTest("workshopPage", async ({ page, workshopPage }) => {
    // when
    await workshopPage.createAndGoto();
    // then
    await expect(page).toHaveScreenshot();
  });

  pageTest("communityPage", async ({ page, communityPage }) => {
    // when
    await communityPage.goto();
    // then
    await expect(page).toHaveScreenshot();
  });

  pageTest("workshopsPage", async ({ page, workshopsPage }) => {
    // when
    await workshopsPage.goto();
    // then
    await expect(page).toHaveScreenshot();
  });

  pageTest(
    "libraryElementPage",
    async ({ page, libraryPage, libraryElementPage }) => {
      // when
      await libraryPage.goto();
      await libraryPage.gotoFirstElementFromSearch();
      // then
      await expect(page).toHaveScreenshot();
    },
  );

  pageTest("workshopElementPage", async ({ page, workshopElementPage }) => {
    // when
    await workshopElementPage.goto();
    // then
    await expect(page).toHaveScreenshot();
  });
});
