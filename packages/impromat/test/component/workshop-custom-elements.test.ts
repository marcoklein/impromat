import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Workshop Elements Page", () => {
  pageTest("should add a custom element", async ({ auth, workshopPage }) => {
    // given
    await auth.loginAsRandomUser();
    await workshopPage.createAndGoto("workshop name");
    // when
    const libraryPage = await workshopPage.openLibrary();
    await libraryPage.createCustomElementAndAddToWorkshop("my-custom-element");
    // then
    await expect(
      workshopPage.getElementByNameLocator("my-custom-element"),
    ).toBeVisible();
  });
});
