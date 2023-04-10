import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest("create workshop", async ({ page, auth, workshopsPage }) => {
  // given
  await auth.loginAsRandomUser();
  const workshopId = await workshopsPage.addWorkshop("testworkshop");

  // go back to workshop overview through menu
  await page.getByRole("button", { name: "menu" }).click();
  await page.locator('ion-menu ion-item[router-link="/workshop"]').click();
  await expect(page).toHaveURL("./workshop");

  // click on workshop to open it again
  await page.getByRole("link", { name: "Open" }).last().click();
  await expect(page).toHaveURL(`./workshop/${workshopId}`);
});
