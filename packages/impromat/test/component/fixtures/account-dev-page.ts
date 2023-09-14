import { expect } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class AccountDevPage extends DevPage {
  async expectToBeSignedOut() {
    await expect(
      this.page.getByRole("heading", { name: "Sign In to Access Impromat" }),
    ).toBeVisible();
  }

  async goto() {
    await this.page.goto("/nav/home/account");
  }

  async login() {
    await this.goto();
    await this.page
      .locator("#main")
      .getByText("Google Sign In")
      .last()
      .click({ timeout: 30000 });
  }

  async logout() {
    await this.goto();
    const page = this.page;
    await page.locator("ion-button").getByText("Logout").click();
    await page
      .locator("ion-alert")
      .getByRole("button", { name: "Logout" })
      .click();
  }
}
