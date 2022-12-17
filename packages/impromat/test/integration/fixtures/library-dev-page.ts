import { DevPage } from "./dev-page";

export class LibraryDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./library`);
  }

  tabLocator(name: string | RegExp) {
    return this.page.getByRole("tab", { name });
  }
}
