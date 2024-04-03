import { Page, expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Logout Flow", () => {
  pageTest(
    "should delete workshops on logout",
    async ({ page, auth, workshopsPage, accountPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      await workshopsPage.addWorkshop("test-workshop");
      await workshopsPage.goto();
      // when
      await accountPage.goto();
      await accountPage.logout();
      await workshopsPage.goto();
      // then
      await expect(
        workshopsPage.page.getByText("test-workshop"),
      ).not.toBeVisible();
    },
  );

  pageTest("should logout", async ({ auth, page, accountPage }) => {
    // given
    await auth.loginAsRandomUser();
    // when
    await accountPage.goto();
    await accountPage.logout();
    // then
    await expect(page).toHaveURL("/nav/my-space");
    for (const storageKey in await getAllLocalStorageKeys(page)) {
      expect(storageKey).not.toContain("impromat");
    }
  });
});

async function getAllLocalStorageKeys(page: Page) {
  const keys = await page.evaluate(() => {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i) as string);
    }
    return keys;
  });
  return keys;
}
