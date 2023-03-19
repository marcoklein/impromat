import { expect } from "@playwright/test";
import { pageTest } from "../component/fixtures/page-fixtures";
import { WorkshopDevPage } from "../component/fixtures/workshop-dev-page";
import { e2ePageTest } from "./fixtures/e2e-page-fixtures";

const sessionId = Date.now();
const uniqueWorkshopName = `test-${sessionId}-replication`;

async function verifySampleWorkshop(workshopPage: WorkshopDevPage) {
  await expect(workshopPage.getElementByNameLocator("Freeze")).toBeVisible();
  await expect(
    workshopPage.getElementByNameLocator("my-first-custom-element"),
  ).toBeVisible();
  await expect(
    workshopPage.getElementByNameLocator("my-second-custom-element"),
  ).toBeVisible();
  await expect(
    workshopPage.getSectionByNameLocator("first-section"),
  ).toBeVisible();
  await expect(
    workshopPage.getSectionByNameLocator("empty-section"),
  ).toBeVisible();
}

// TODO login functionality for e2e test is not implemented yet
pageTest.skip("Replication", () => {
  e2ePageTest(
    "should create a base workshop with some sections and elements",
    async ({ workshopPage, libraryPage, prepareLoggedInSession }) => {
      // given
      await prepareLoggedInSession();
      // when
      await workshopPage.createNew(uniqueWorkshopName);
      await workshopPage.addElementFromSearch();
      await workshopPage.addSection("first-section");
      await workshopPage.openLibrary();
      await libraryPage.createCustomElementAndAddToWorkshop(
        "my-first-custom-element",
      );
      await workshopPage.openLibrary();
      await libraryPage.createCustomElementAndAddToWorkshop(
        "my-second-custom-element",
      );
      await workshopPage.addSection("empty-section");
      // then
      await verifySampleWorkshop(workshopPage);
    },
  );

  e2ePageTest(
    "should replicate the sample workshop into a second session",
    async ({ page, workshopPage, workshopsPage, prepareLoggedInSession }) => {
      // given
      await prepareLoggedInSession();
      // when
      // TODO fix synchronization as the workshop does not load without a timeout
      await page.waitForTimeout(20000);
      await workshopsPage.goto();
      await workshopsPage
        .getWorkshopWithNameLocator(uniqueWorkshopName)
        .click();
      // then
      await verifySampleWorkshop(workshopPage);
    },
  );
});
