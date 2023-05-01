import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Workshops Preview Cards", () => {
  const workshopName = "test-workshop";
  pageTest.beforeEach(async ({ page, auth, workshopsPage }) => {
    // given
    await auth.loginAsRandomUser();
    await workshopsPage.addWorkshop("test-workshop");
  });

  pageTest("should show workshop title", async ({ page, workshopsPage }) => {
    // given beforeEach
    // when
    await workshopsPage.goto();
    // then
    await expect(page.getByText(workshopName)).toBeVisible();
  });

  pageTest("should show workshop infos", async ({ page, workshopsPage }) => {
    // given beforeEach
    const extectedDate = new Date().toLocaleDateString();
    // when
    await workshopsPage.goto();
    // then
    await expect(page.getByText("my workshop")).toBeVisible();
    await expect(page.getByText(extectedDate)).toBeVisible();
  });
});
