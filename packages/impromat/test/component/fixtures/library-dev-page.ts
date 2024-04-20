import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";

const NOT_LIBRARY_CUSTOM_ELEMENT_URL_REGEX =
  /^((?!library-add-custom-element).)*$/;

export class LibraryDevPage extends DevPage {
  readonly createElementButtonLocator: Locator;
  readonly createCustomElementButtonLocator: Locator;
  readonly searchInputLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.createElementButtonLocator = page.getByLabel("New Element");
    this.createCustomElementButtonLocator = page.getByLabel("add", {
      exact: true,
    });
    this.searchInputLocator = page.locator("input");
  }

  async goto() {
    await this.page.goto(`/nav/elements`);
  }

  async searchForElement(searchText: string) {
    const page = this.page;
    await this.searchInputLocator.fill(searchText);
    await page.keyboard.press("Enter");
    await page.getByText(new RegExp(searchText, "i")).first().waitFor();
  }

  async gotoFirstElementFromSearch() {
    const searchText = "freeze";
    await this.searchForElement(searchText);
    await this.openElementCard("freeze");
  }

  async clearSearch() {
    await this.page.getByLabel("reset").click();
  }

  async openElementCard(name?: string) {
    const page = this.page;
    if (name) {
      await page
        .locator("a", {
          hasText: name,
        })
        .first()
        .click();
    } else {
      await page.waitForTimeout(500);
      await page.locator("a").first().click();
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

    await this.createCustomElementButtonLocator.click();
    await page.waitForURL(NOT_LIBRARY_CUSTOM_ELEMENT_URL_REGEX);
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
