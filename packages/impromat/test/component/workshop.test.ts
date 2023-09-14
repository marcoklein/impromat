import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Workshop Page", () => {
  pageTest(
    "should rename a new workshop",
    async ({ page, auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("workshop name");
      // when
      await workshopPage.rename("renamed workshop name");
      // then
      await page.waitForSelector('text="renamed workshop name"');
    },
  );

  pageTest("should add a description", async ({ page, auth, workshopPage }) => {
    // given
    await auth.loginAsRandomUser();
    await workshopPage.createAndGoto("workshop name");
    const description = "testing description";
    // when
    await workshopPage.optionsLocator.click();
    await page.getByRole("button", { name: "Add Description" }).click();
    await page.locator("textarea").fill(description);
    await page.getByRole("button", { name: "Save" }).click();
    // then
    await page.waitForSelector('text="testing description"');
  });

  pageTest("should remove a workshop", async ({ page, auth, workshopPage }) => {
    // given
    await auth.loginAsRandomUser();
    await workshopPage.createAndGoto("workshop name");
    // when
    await workshopPage.optionsLocator.click();
    await page.getByRole("button", { name: "Delete" }).click();
    await page
      .locator("ion-alert")
      .getByRole("button", { name: "Delete" })
      .click();
    // then
    await page.waitForURL("/nav/workshop");
    await expect(page.getByText("Add Workshop")).toBeVisible();
  });
});
