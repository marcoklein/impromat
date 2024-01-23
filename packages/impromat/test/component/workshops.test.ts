import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Workshops Page", () => {
  pageTest(
    "workshop flow",
    async ({ page, auth, workshopsPage, workshopPage }) => {
      // given
      const randomWorkshopName = randomUUID();
      await auth.loginAsRandomUser();
      await workshopsPage.goto();
      let workshopId: string;

      await pageTest.step("should create a workshop", async () => {
        // when
        workshopId = await workshopsPage.addWorkshop(randomWorkshopName);
        // then
        await expect(page).toHaveURL(`/workshop/${workshopId}`);
      });

      await pageTest.step("should show the workshop", async () => {
        // when
        await workshopsPage.goto();
        // then
        await expect(page.getByText(randomWorkshopName).first()).toBeVisible();
      });

      await pageTest.step("should open the workshop", async () => {
        // when
        await page.getByText(randomWorkshopName).first().click();
        // then
        await expect(page).toHaveURL(`/workshop/${workshopId}`);
      });
    },
  );
});
