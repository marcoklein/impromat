import { Page } from "@playwright/test";

export async function blockImpromatApiRequests(page: Page) {
  await page.route(`${process.env.VITE_API_URL}/*`, async (route) => {
    await route.abort();
  });
}

export async function unblockImpromatApiRequests(page: Page) {
  await page.unroute(`${process.env.VITE_API_URL}/*`);
}
