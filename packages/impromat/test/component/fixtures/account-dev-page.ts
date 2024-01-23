import { Locator, Page, expect } from "@playwright/test";
import { DevPage } from "./dev-page.js";

export class AccountDevPage extends DevPage {
  readonly logoutLocator: Locator;
  readonly logoutButtonLocator: Locator;
  readonly loginTabLocator: Locator;
  readonly mySpaceTabLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutLocator = page.getByLabel("Logout");
    this.logoutButtonLocator = page.getByRole("button", { name: "Logout" });
    this.loginTabLocator = page.getByRole("link", { name: "Login" });
    this.mySpaceTabLocator = page.getByRole("link", { name: "My Space" });
  }

  async expectToBeSignedOut() {
    await expect(
      this.page.getByRole("heading", { name: "Sign In to Access Impromat" }),
    ).toBeVisible();
  }

  async goto() {
    await this.page.goto("/nav/my-space");
  }

  async login() {
    await this.page.locator("#main").getByText("Google Sign In").last().click();
  }

  async logout() {
    await this.goto();
    await this.logoutLocator.click();
    await this.logoutButtonLocator.click();
  }
}
