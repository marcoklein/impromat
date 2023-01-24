import { expect } from "@playwright/test";
import { pageTest } from "../component/fixtures/page-fixtures";
import { WorkshopDevPage } from "../component/fixtures/workshop-dev-page";
import { WorkshopsDevPage } from "../component/fixtures/workshops-dev-page";

declare const process: any;

pageTest.describe("Replication", () => {
  pageTest(
    "should replicate data between two sessions",
    async ({ page, browser, workshopPage, workshopsPage }) => {
      const sessionId = Date.now();
      const { otherPage } = await pageTest.step(
        "prepare open two Impromat sessions in different browsers",
        async () => {
          const cookie = {
            name: "connect.sid",
            value: process.env.COOKIE_SECRET,
            domain: process.env.COOKIE_DOMAIN,
            httpOnly: true,
            sameSite: "Strict",
            path: "/",
          } as const;
          const otherContext = await browser.newContext();
          const otherPage = await otherContext.newPage();
          const context = page.context();
          await context.addCookies([cookie]);
          await otherContext.addCookies([cookie]);
          await Promise.all([
            page.goto("https://dev.impromat.app/account"),
            otherPage.goto("https://dev.impromat.app/account"),
          ]);
          await expect(
            page.getByText("You are signed in").first(),
            "Expected to be signed in",
          ).toBeVisible();
          await expect(
            otherPage.getByText("You are signed in").first(),
            "Expected to be signed in",
          ).toBeVisible();
          return { context, otherContext, otherPage };
        },
      );

      const { workshopName, workshopId } = await pageTest.step(
        "create a workshop",
        async () => {
          const workshopName = `test-${sessionId}`;
          const workshopId = await workshopPage.createNew(workshopName);
          await workshopsPage.goto();
          await expect(page.getByText(workshopName)).toBeVisible();
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
