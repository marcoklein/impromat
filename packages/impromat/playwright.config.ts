import type { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
declare const process: any;

dotenv.config({ path: ".env.test.local" });
dotenv.config({ path: ".env.test" });
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const config: PlaywrightTestConfig = {
  webServer: {
    command: "yarn start",
    env: {
      // REACT_APP_AUTO_LOGIN: "1",
      // PORT: "3003",
      // REACT_APP_PORT: "3003",
      // REACT_APP_API_URL: "http://localhost:12345",
    },
    port: 3003,
    timeout: 2 * 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    browserName: "chromium",
    headless: true,
    viewport: { width: 360, height: 800 },
    ignoreHTTPSErrors: true,
    isMobile: true,
    baseURL: "http://localhost:3003/",
    actionTimeout: 15 * 1000,
  },
  expect: {
    timeout: 15 * 1000,
  },
  testDir: "test/component",
  reporter: [["list"], ["junit", { outputFile: "junit-results.xml" }]],
  fullyParallel: true,
  retries: 2,
  timeout: 60 * 1000,
};

export default config;
