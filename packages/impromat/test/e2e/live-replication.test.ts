import { expect } from "@playwright/test";
import { pageTest } from "../component/fixtures/page-fixtures";
import { WorkshopDevPage } from "../component/fixtures/workshop-dev-page";
import { WorkshopsDevPage } from "../component/fixtures/workshops-dev-page";
import { e2ePageTest } from "./fixtures/e2e-page-fixtures";

// TODO login functionality for e2e test is not implemented yet
// e.g. see https://docs.cypress.io/guides/end-to-end-testing/google-authentication#Google-Project-and-Application-Setup
pageTest.skip("Live Replication", () => {
  e2ePageTest(
    "should replicate data between two sessions",
    async ({
      page,
      browser,
      workshopPage,
      workshopsPage,
      prepareLoggedInSession,
    }) => {
      const sessionId = Date.now();
      const { otherPage } = await pageTest.step(
        "prepare and open two Impromat sessions in different browsers",
        async () => {
          const otherContext = await browser.newContext();
          const otherPage = await otherContext.newPage();

          await prepareLoggedInSession(page);
          await prepareLoggedInSession(otherPage);

          return { otherContext, otherPage };
        },
      );

      const { workshopName, workshopId } = await pageTest.step(
        "create a workshop",
        async () => {
          const workshopName = `test-${sessionId}`;
          const workshopId = await workshopPage.createNew(workshopName);
          await workshopsPage.goto();
          await workshopsPage.expectToShowWorkshopWithName(workshopName);
          return { workshopName, workshopId };
        },
      );

      await pageTest.step(
        "wait for workshop to replicate to other Impromat session",
        async () => {
          const otherWorkshopsPage = new WorkshopsDevPage(otherPage);
          await otherWorkshopsPage.goto();
          await expect(otherPage.getByText(workshopName)).toBeVisible();
        },
      );

      await pageTest.step("add an element to the workshop", async () => {
        await workshopPage.goto(workshopId);
        await workshopPage.addElementFromSearch();
      });

      await pageTest.step(
        "wait for workshop element to replicate to other Impromat session",
        async () => {
          const otherWorkshopPage = new WorkshopDevPage(otherPage);
          await otherWorkshopPage.goto(workshopId);
          await expect(otherPage.getByText("Freeze").first()).toBeVisible();
        },
      );

      await pageTest.step("should have content in element", async () => {
        await workshopPage.elementSelector.click();
        await expect(
          page.getByText(
            "Two performers will start a scene and at anytime another performer can yell “freeze” and replace one of the performers in the scene by assuming their frozen pose.",
          ),
        ).toBeVisible();
      });
    },
  );
});
