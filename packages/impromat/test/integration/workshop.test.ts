import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Workshop Page", () => {
  pageTest("should rename a new workshop", async ({ page, workshopPage }) => {
    // given
    await workshopPage.createAndGoto("workshop name");
    // when
    await workshopPage.rename("renamed workshop name");
    // then
    await page.waitForSelector('text="renamed workshop name"');
  });

  pageTest("should add a description", async ({ page, workshopPage }) => {
    // given
    await workshopPage.createAndGoto("workshop name");
    const description = "testing description";
    // when
    await workshopPage.optionsLocator.click();
    await page.getByRole("button", { name: "Create Add Description" }).click();
    await page.locator("textarea").fill(description);
    await page.getByRole("button", { name: "Save" }).click();
    // then
    await page.waitForSelector('text="testing description"');
  });

  pageTest("should remove a workshop", async ({ page, workshopPage }) => {
    // given
    await workshopPage.createAndGoto("workshop name");
    // when
    await workshopPage.optionsLocator.click();
    await page.getByRole("button", { name: "Trash Delete" }).click();
    // TODO test for confirmation dialog
    // then
    await page.waitForURL("./workshop");
    await page.waitForSelector('text="Welcome to Impromat"');
  });
});
