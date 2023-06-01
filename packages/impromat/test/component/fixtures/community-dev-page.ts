import { DevPage } from "./dev-page.js";

export class CommunityDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./community`);
  }
}
