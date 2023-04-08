import { Page } from "@playwright/test";
import { pageTest } from "../../component/fixtures/page-fixtures";
import { changePageAuthenticationCookie } from "./change-page-authentication-cookie";

declare const process: { env: Record<string, string | undefined> };

type E2EPageFixtures = {
  prepareLoggedInSession: (page?: Page) => Promise<void>;
};

const test = pageTest.extend<E2EPageFixtures>({
  prepareLoggedInSession: async ({ page: originalPage, baseURL }, use) => {
    await use(async (page = originalPage) => {
      await changePageAuthenticationCookie(page, process.env.COOKIE_SECRET);
      await page.goto("/account");
      await page.getByText("You are signed in").first().waitFor();
    });
  },
});

export { test as e2ePageTest };
