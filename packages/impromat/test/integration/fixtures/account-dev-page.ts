import { DevPage } from "./dev-page";

export class AccountDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./account`);
  }
}
