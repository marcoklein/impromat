import { test as base } from "@playwright/test";
import { AccountDevPage } from "./account-dev-page.js";
import { AuthFixture } from "./auth-fixture.js";
import { CommunityDevPage } from "./community-dev-page.js";
import { FavoriteElementsDevPage } from "./favorite-elements-dev-page.js";
import { HomeDevPage } from "./home-dev-page.js";
import { LibraryDevPage } from "./library-dev-page.js";
import { LibraryElementDevPage } from "./library-element-dev-page.js";
import { WorkshopDevPage } from "./workshop-dev-page.js";
import { WorkshopElementDevPage } from "./workshop-element-dev-page.js";
import { WorkshopsDevPage } from "./workshops-dev-page.js";

type PageFixtures = {
  homePage: HomeDevPage;
  workshopPage: WorkshopDevPage;
  workshopsPage: WorkshopsDevPage;
  workshopElementPage: WorkshopElementDevPage;
  libraryPage: LibraryDevPage;
  libraryElementPage: LibraryElementDevPage;
  favoriteElementsPage: FavoriteElementsDevPage;
  accountPage: AccountDevPage;
  auth: AuthFixture;
  communityPage: CommunityDevPage;
};

const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomeDevPage(page));
  },
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
  communityPage: async ({ page }, use) => {
    await use(new CommunityDevPage(page));
  },
});

export { test as pageTest };
