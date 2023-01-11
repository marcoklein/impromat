import type { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
declare const process: any;

console.log("Loading .env.test.local");
dotenv.config({ path: "./.env.test.local" });
console.log("Loading .env.test");
dotenv.config({ path: "./.env.test" });

const config: PlaywrightTestConfig = {
  use: {
    browserName: "chromium",
    headless: true,
    viewport: { width: 360, height: 800 },
    ignoreHTTPSErrors: true,
    isMobile: true,
    baseURL: process.env.BASE_URL ?? "https://dev.impromat.app/",
    actionTimeout: 30 * 1000,
  },
  expect: {
    timeout: 30 * 1000,
  },
  testDir: "test/e2e",
  reporter: [["list"], ["junit", { outputFile: "junit-results.xml" }]],
  fullyParallel: false,
  retries: 2,
  timeout: 60 * 1000,
};

export default config;
