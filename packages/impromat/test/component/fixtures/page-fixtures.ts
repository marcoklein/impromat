import { test as base } from "@playwright/test";
import { AccountDevPage } from "./account-dev-page";
import { LibraryDevPage } from "./library-dev-page";
import { WorkshopDevPage } from "./workshop-dev-page";
import { WorkshopElementDevPage } from "./workshop-element-dev-page";
import { WorkshopsDevPage } from "./workshops-dev-page";

type PageFixtures = {
  workshopPage: WorkshopDevPage;
  workshopsPage: WorkshopsDevPage;
  workshopElementPage: WorkshopElementDevPage;
  libraryPage: LibraryDevPage;
  accountPage: AccountDevPage;
};

const test = base.extend<PageFixtures>({
  workshopPage: async ({ page }, use) => {
    await use(new WorkshopDevPage(page));
  },
  workshopsPage: async ({ page }, use) => {
    await use(new WorkshopsDevPage(page));
  },
  workshopElementPage: async ({ page }, use) => {
    await use(new WorkshopElementDevPage(page));
  },
  libraryPage: async ({ page }, use) => {
    await use(new LibraryDevPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountDevPage(page));
  },
});

export { test as pageTest };