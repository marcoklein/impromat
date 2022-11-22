import { test, expect } from "@playwright/test";

test("create workshop", async ({ page }) => {
  // workshop page
  await page.goto("./workshop");

  // add workshop
  await page.locator("text=AddAdd Workshop >> button").click();
  await expect(page).toHaveURL("./workshop?dialog");

  // type workshop name
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("Test Workshop");

  // save workshop
  await page.locator('button:has-text("Save")').click();

  // verify navigation to new workshop
  await page.waitForNavigation();
  const workshopId = /[^/]*?$/.exec(page.url())![0];
  await expect(page).toHaveURL(`./workshop/${workshopId}`);

  // go back to workshop overview through menu
  await page.locator('button:has-text("Menu")').click();
  await page.locator('ion-menu ion-item[router-link="/workshop"]').click();
  await expect(page).toHaveURL("./workshop");

  // click on workshop to open it again
  await page.locator("#main > div > ion-content > ion-list > ion-item").click();
  await expect(page).toHaveURL(`./workshop/${workshopId}`);
});
