import { test as base } from "@playwright/test";
import { AccountDevPage } from "./account-dev-page";
import { AuthFixture } from "./auth-fixture";
import { FavoriteElementsDevPage } from "./favorite-elements-dev-page";
import { LibraryDevPage } from "./library-dev-page";
import { LibraryElementDevPage } from "./library-element-dev-page";
import { WorkshopDevPage } from "./workshop-dev-page";
import { WorkshopElementDevPage } from "./workshop-element-dev-page";
import { WorkshopsDevPage } from "./workshops-dev-page";

type PageFixtures = {
  workshopPage: WorkshopDevPage;
  workshopsPage: WorkshopsDevPage;
  workshopElementPage: WorkshopElementDevPage;
  libraryPage: LibraryDevPage;
  libraryElementPage: LibraryElementDevPage;
  favoriteElementsPage: FavoriteElementsDevPage;
  accountPage: AccountDevPage;
  auth: AuthFixture;
};

const test = base.extend<PageFixtures>({
  workshopPage: async ({ page }, use) => {
    await use(new WorkshopDevPage(page));
  },
  workshopsPage: async ({ page }, use) => {
    await use(new WorkshopsDevPage(page));
  },
  favoriteElementsPage: async ({ page }, use) => {
    await use(new FavoriteElementsDevPage(page));
  },
  workshopElementPage: async ({ page }, use) => {
    await use(new WorkshopElementDevPage(page));
  },
  libraryPage: async ({ page }, use) => {
    await use(new LibraryDevPage(page));
  },
  libraryElementPage: async ({ page }, use) => {
    await use(new LibraryElementDevPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountDevPage(page));
  },
  auth: async ({ page }, use) => {
    await use(new AuthFixture(page));
  },
});

export { test as pageTest };
