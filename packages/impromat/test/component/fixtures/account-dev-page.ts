import { expect } from "@playwright/test";
import { DevPage } from "./dev-page";

export class AccountDevPage extends DevPage {
  async expectToBeSignedOut() {
    await expect(
      this.page.getByRole("heading", { name: "Sign In to Access Impromat" }),
    ).toBeVisible();
  }

  async goto() {
    await this.page.goto(`./account`);
  }

  async login() {
    await this.goto();
    await this.page
      .locator("ion-button.google-sign-in-button")
      .last()
      .click({ timeout: 30000 });
  }

  async logout() {
    await this.goto();
    const page = this.page;
    await page.locator("ion-item").getByText("Logout").click();
    await page
      .locator("ion-alert")
      .getByRole("button", { name: "Logout" })
      .click();
    // await page.waitForNavigation();
  }
}
