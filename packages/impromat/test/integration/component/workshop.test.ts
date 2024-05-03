import { expect } from "@playwright/test";
import { randomUUID } from "crypto";
import { pageTest } from "../fixtures/page-fixtures.js";

pageTest.describe("Workshop Page", () => {
  pageTest(
    "standard flow",
    async ({ page, auth, workshopPage, workshopsPage }) => {
      // given
      await auth.loginAsRandomUser();
      let workshopName: string = randomUUID();

      await pageTest.step("should create a new workshop", async () => {
        // when
        await workshopsPage.goto();
        await workshopPage.createAndGoto(workshopName);
        // then
        await expect(
          workshopPage.getWorkshopNameLocator(workshopName),
        ).toBeVisible();
      });

      await pageTest.step("should rename the workshop", async () => {
        // given
        const newWorkshopName = "renamed workshop name";
        workshopName = newWorkshopName;
        // when
        await workshopPage.rename(newWorkshopName);
        // then
        await expect(
          workshopPage.getWorkshopNameLocator(newWorkshopName),
        ).toBeVisible();
      });

      await pageTest.step("should add a description", async () => {
        // given
        const description = "testing description";
        // when
        await page.waitForTimeout(200);
        await workshopPage.addDescription(description);
        // then
        await expect(page.getByText(description)).toBeVisible();
      });

      await pageTest.step("should duplicate the workshop", async () => {
        // given
        const copiedWorkshopName = workshopName + " (copy)";
        // when
        await page.waitForTimeout(200);
        await workshopPage.duplicate();
        // then
        await expect(page.getByText(copiedWorkshopName)).toBeVisible();
      });

      await pageTest.step("should delete the workshop", async () => {
        // when
        await page.waitForTimeout(200);
        await workshopPage.delete();
        // then
        await expect(page.getByText(workshopName)).not.toBeVisible();
      });
    },
  );
});
