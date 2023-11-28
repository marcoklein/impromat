import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";

const NOT_LIBRARY_CUSTOM_ELEMENT_URL_REGEX =
  /^((?!library-add-custom-element).)*$/;

export class LibraryDevPage extends DevPage {
  readonly createElementButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.createElementButtonLocator = page.getByText("New Element");
  }

  async goto() {
    await this.page.goto(`/nav/elements`);
  }

  async searchForElement(searchText: string) {
    const page = this.page;
    await page.locator("ion-input").getByPlaceholder("Search").fill(searchText);
    await page.getByText(new RegExp(searchText, "i")).first().waitFor();
  }

  async gotoFirstElementFromSearch() {
    const searchText = "freeze";
    await this.searchForElement(searchText);
    await this.openElementCard();
  }

  async clearSearch() {
    await this.page.getByLabel("reset").click();
  }

  async scrollDownInElementsList() {
    const lastListItem = this.page
      .locator(".list-class-name>div") // .item-class-name
      .nth(-1);
    await lastListItem.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
  }

  async openElementCard(name?: string) {
    const page = this.page;
    if (name) {
      await page
        .locator("ion-card", {
          hasText: name,
        })
        .getByRole("link", { name: "Open" })
        .click();
    } else {
      await page.getByRole("link", { name: "Open" }).first().click();
    }
  }

  async gotoSearch() {
    await this.goto();
  }

  async toggleLikedFilter() {
    await this.page.locator("ion-chip").filter({ hasText: "Like" }).click();
  }

  async clickMyElementsFilter() {
    await this.page
      .locator("ion-chip")
      .filter({ hasText: "My Element" })
      .click();
  }

  tabLocator(name: string | RegExp) {
    return this.page.getByRole("contentinfo").getByText(name).first();
  }

  async createCustomElement(
    name: string = "test custom element",
    options?: { isPublic: boolean },
  ) {
    const page = this.page;
    await this.fillCustomElementPage({
      name,
      isPublic: options?.isPublic ?? false,
    });

    await page.getByRole("button", { name: "Create Element" }).click();
    await page.waitForURL(NOT_LIBRARY_CUSTOM_ELEMENT_URL_REGEX);
  }

  // TODO refactor when https://github.com/marcoklein/impromat/issues/254 is resolved
  async createCustomElementAndAddToWorkshop(
    name: string,
    options?: { isPublic?: boolean },
  ) {
    await this.fillCustomElementPage({
      name,
      isPublic: options?.isPublic ?? false,
    });

    await this.page
      .getByRole("button", { name: "Create and Add to Workshop" })
      .click();
  }

  private async fillCustomElementPage(options: {
    name: string;
    isPublic: boolean;
  }) {
    const page = this.page;
    await this.createElementButtonLocator.click();
    await page.getByRole("textbox", { name: "Name" }).fill(options.name);

    if (options.isPublic) {
      await page
        .getByRole("checkbox", {
          name: "Add to Community Impromat Elements",
          exact: true,
        })
        .click();
    }
  }
}
