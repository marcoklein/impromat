import { DevPage } from "./dev-page";

export class LibraryDevPage extends DevPage {
  async goto() {
    await this.page.goto(`./library`);
  }

  async searchForElement(searchText: string) {
    const page = this.page;
    await page.getByPlaceholder("Search").click();
    await page.getByPlaceholder("Search").fill(searchText);
  }

  async gotoElementFromSearch() {
    const page = this.page;
    const searchText = "freeze";
    // TODO this is a workaround to allow the search to load the improbib json
    // fix it by fixing the search in the search component
    // await page.waitForTimeout(1000);
    await this.searchForElement(searchText);
    await page.getByText("improwikiENFreeze").click();
  }

  searchTabLocator() {
    return this.page.getByText("SearchExplore");
  }

  libraryTabLocator() {
    return this.page.getByText("BrushMy Library");
  }

  tabLocator(name: string | RegExp) {
    return this.page.getByRole("contentinfo").getByText(name);
  }

  async createCustomElement(name: string = "test custom element") {
    const libraryPage = this;
    const page = this.page;
    await libraryPage.libraryTabLocator().click();
    await page.locator("ion-fab-button").click();
    await page.getByRole("textbox", { name: "Name" }).fill(name);
    await page.getByRole("button", { name: "Create Element" }).click();
  }

  async createCustomElementAndAddToWorkshop(name: string) {
    const libraryPage = this;
    const page = this.page;
    await libraryPage.libraryTabLocator().click();
    await page.locator("ion-fab-button").click();
    await page.getByRole("textbox", { name: "Name" }).fill(name);
    await this.page
      .getByRole("button", { name: "Create and Add to Workshop" })
      .click();
  }
}
