import { DevPage } from "./dev-page";

export class AccountDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./account`);
  }

  async logout() {
    const page = this.page;
    await page.getByRole("button", { name: "Logout" }).click();
    await page.waitForNavigation();
  }
}
