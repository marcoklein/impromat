import { expect } from "@playwright/test";
import { pageTest } from "../fixtures/page-fixtures.js";

pageTest.describe("Workshop Elements Page", () => {
  pageTest(
    "add custom element to workshop",
    async ({
      auth,
      workshopPage,
      workshopsPage,
      libraryElementPage,
      libraryPage,
    }) => {
      // given
      const workshopName = "test workshop name";
      const customElementName = "my-custom-element";
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      await workshopPage.createAndGoto(workshopName);

      await pageTest.step(
        "should add a custom element to workshop",
        async () => {
          // when
          await workshopPage.openLibraryToAddNewElement();
          await libraryPage.createCustomElement(customElementName);
          await libraryElementPage.addToWorkshop(workshopName);
          // then
          await expect(
            workshopPage.getElementByNameLocator(customElementName),
          ).toBeVisible();
        },
      );
    },
  );
});
