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
    await page.waitForSelector(
      '*:has-text("improwikiDEFreeze TagKettenspieleSwitches")',
    );
    await page.getByText("improwikiDEFreeze TagKettenspieleSwitches").click();
  }

  tabLocator(name: string | RegExp) {
    return this.page.getByRole("tab", { name });
  }

  async createCustomElement(name: string = "test custom element") {
    const libraryPage = this;
    const page = this.page;
    await libraryPage.goto();
    await libraryPage.tabLocator(/Custom/).click();
    await page.locator("ion-fab-button").click();
    await page.getByRole("textbox", { name: "Name" }).fill(name);
    await page.getByRole("button", { name: "Create Element" }).click();
  }
}
