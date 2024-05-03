import { Locator, Page } from "@playwright/test";
import { DevPage } from "./dev-page.js";
import { LibraryDevPage } from "./library-dev-page.js";
import { WorkshopsDevPage } from "./workshops-dev-page.js";

export class WorkshopDevPage extends DevPage {
  readonly optionsLocator: Locator;
  readonly addFirstElementLocator: Locator;
  readonly elementSelector: Locator;
  readonly addElementButtonLocator: Locator;
  readonly addSectionButtonLocator: Locator;
  readonly addToLikesButtonLocator: Locator;
  readonly removeFromLikesButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.optionsLocator = page.getByLabel("Options");
    this.addFirstElementLocator = page.getByRole("link", {
      name: "Add First Element",
    });
    this.elementSelector = page
      .getByRole("heading")
      .getByText("Freeze")
      .first();
    this.addElementButtonLocator = page.getByRole("link", {
      name: "Element",
    });
    this.addSectionButtonLocator = page.getByRole("button", {
      name: "Section",
      exact: true,
    });

    this.addToLikesButtonLocator = page.getByRole("button", {
      name: "Add to likes.",
    });
    this.removeFromLikesButtonLocator = page.getByRole("button", {
      name: "Remove from likes.",
    });
  }

  getWorkshopNameLocator(workshopName: string) {
    return this.page.getByRole("heading", { name: workshopName });
  }

  async createNew(name: string) {
    return await new WorkshopsDevPage(this.page).addWorkshop(name);
  }

  async goto(workshopId: string) {
    await this.page.goto(`/workshop/${workshopId}`);
  }

  async gotoElementFromSearch() {
    const page = this.page;
    await this.addElementButtonLocator.click();
    await new LibraryDevPage(page).gotoFirstElementFromSearch();
  }

  async deprecated_addElementFromSearch() {
    const page = this.page;
    await this.gotoElementFromSearch();
    await page
      .getByRole("button", { name: "Add to workshop", exact: true })
      .click();
    await page.waitForURL(/\/workshop\/.*/);
    await page.getByRole("heading", { name: "Freeze" }).last().waitFor();
  }

  async addSection(name: string) {
    const page = this.page;

    await this.addSectionButtonLocator.click();

    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill(name);
    await page.locator('button:has-text("Save")').click();
  }

  getSectionByNameLocator(name: string) {
    return this.page.getByText(name);
  }

  getElementByNameLocator(name: string) {
    return this.page.getByRole("link", { name });
  }

  async createAndGoto(name: string = "Test Workshop") {
    const workshopId = await this.createNew(name);
    await this.goto(workshopId);
    return workshopId;
  }

  async shareViaLink() {
    const page = this.page;
    await page.getByRole("button", { name: "Share", exact: true }).click();
    await page.getByText("Anyone with the link can view").click();
    await page.getByRole("button", { name: "Copy workshop link" }).click();
  }

  async shareWithCommunity() {
    const page = this.page;
    await this.shareViaLink();
    await page.getByRole("button", { name: "Share with community" }).click();
  }

  async closeSection(name: string = "[Default Section]") {
    const page = this.page;
    await page.getByText("first-section").click();
    await page.waitForTimeout(200);
  }

  async openLibraryToAddNewElement() {
    await this.addElementButtonLocator.click();
  }

  async rename(newName: string) {
    const page = this.page;
    await this.optionsLocator.click();
    await page.getByRole("button", { name: "Rename" }).click();
    await page.locator('input[type="text"]').fill(newName);
    await page.getByRole("button", { name: "Save" }).click();
  }

  async addDescription(description: string) {
    const page = this.page;
    await this.optionsLocator.click();
    await page.getByRole("button", { name: "Add Description" }).click();
    await page.locator("textarea").first().fill(description);
    await page.getByRole("button", { name: "Save" }).click();
  }

  async duplicate() {
    const page = this.page;
    await this.optionsLocator.click();
    await page.getByRole("button", { name: "Duplicate" }).click();
    await page.waitForURL(/\/workshop\/.*/);
  }

  /**
   * Deletes the current workshop.
   */
  async delete() {
    const page = this.page;
    await this.optionsLocator.click();
    await page.getByRole("button", { name: "Delete" }).click();
    await page.getByRole("button", { name: "Delete" }).click();

    await page.waitForURL("/nav/workshop");
  }

  async like() {
    await this.addToLikesButtonLocator.click();
    await this.removeFromLikesButtonLocator.waitFor();
  }

  async unlike() {
    await this.removeFromLikesButtonLocator.click();
    await this.addToLikesButtonLocator.waitFor();
  }
}
