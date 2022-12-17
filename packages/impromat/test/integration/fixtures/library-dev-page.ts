import { DevPage } from "./dev-page";

export class LibraryDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./library`);
  }

  async gotoElementFromSearch() {
    const page = this.page;
    const searchText = "freeze";
    await page.getByPlaceholder("Search").click();
    await page.getByPlaceholder("Search").fill(searchText);
    await page.getByText("improwikiDEFreeze TagKettenspieleSwitches").click();
  }

  tabLocator(name: string | RegExp) {
    return this.page.getByRole("tab", { name });
  }
}
