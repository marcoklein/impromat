import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Workshop Elements Page", () => {
  // TODO https://github.com/marcoklein/impromat/issues/254
  pageTest.skip(
    "should add a custom element",
    async ({ auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("workshop name");
      // when
      const libraryPage = await workshopPage.openLibrary();
      await libraryPage.createCustomElementAndAddToWorkshop(
        "my-custom-element",
      );
      // then
      await expect(
        workshopPage.getElementByNameLocator("my-custom-element"),
      ).toBeVisible();
    },
  );

  // TODO https://github.com/marcoklein/impromat/issues/254
  pageTest.skip(
    "should show an 'edit here' button",
    async ({ auth, page, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("workshop name");

      // when
      const libraryPage = await workshopPage.openLibrary();
      await libraryPage.createCustomElementAndAddToWorkshop(
        "my-custom-element",
      );
      await page.getByText("my-custom-element").click();
      // then
      await workshopPage.expectToolbarTextToBe("my-custom-element");
      await expect(page.getByText("Edit Here")).toBeVisible();
    },
  );
});
