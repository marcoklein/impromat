import { expect } from "@playwright/test";
import { pageTest } from "../component/fixtures/page-fixtures";
import { WorkshopsDevPage } from "../component/fixtures/workshops-dev-page";

declare const process: any;

pageTest.describe("Replication", () => {
  pageTest(
    "should replicate data between two sessions",
    async ({ accountPage, page, browser, workshopPage, workshopsPage }) => {
      const sessionId = Date.now();
      const { context, otherContext, otherPage } = await pageTest.step(
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
          return { context, otherContext, otherPage };
        },
      );

      const { workshopName } = await pageTest.step(
        "create a workshop",
        async () => {
          const workshopName = `test-${sessionId}`;
          await workshopPage.createNew(workshopName);
          await workshopsPage.goto();
          await expect(page.getByText(workshopName)).toBeVisible();
          return { workshopName };
        },
      );

      await pageTest.step(
        "wait for workshop to replicate to other Impromat session",
        async () => {
          pageTest.setTimeout(15000);
          const otherWorkshopsPage = new WorkshopsDevPage(otherPage);
          await otherWorkshopsPage.goto();
          await expect(otherPage.getByText(workshopName)).toBeVisible();
        },
      );
    },
  );
});
