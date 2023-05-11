import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Workshop Sections", () => {
  pageTest(
    "should add a section to a workshop",
    async ({ auth, workshopPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopPage.createAndGoto("workshop name");
      // when
      await workshopPage.addSection("unique section");
      // then
      await expect(
        workshopPage.getSectionByNameLocator("unique section"),
      ).toBeVisible();
    },
  );
});
