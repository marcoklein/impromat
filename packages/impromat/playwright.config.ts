import type { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
declare const process: any;

dotenv.config({ path: ".env.test.local" });
dotenv.config({ path: ".env.test" });
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const PORT = Number(process.env.PORT);
if (!PORT) throw new Error("PORT environment variable undefined.");

const config: PlaywrightTestConfig = {
  webServer: {
    //yarn docker-compose up api database --wait &&
    // yarn docker-compose --profile backend up --no-recreate --wait
    command: "yarn start",
    port: PORT,
    timeout: 4 * 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    browserName: "chromium",
    headless: true,
    viewport: { width: 360, height: 800 },
    ignoreHTTPSErrors: true,
    isMobile: true,
    baseURL: `http://localhost:${PORT}/`,
    actionTimeout: 15 * 1000,
  },
  expect: {
    timeout: 15 * 1000,
  },
  testDir: "test/component",
  reporter: [["list"], ["junit", { outputFile: "junit-results.xml" }]],
  fullyParallel: false,
  retries: 2,
  timeout: 60 * 1000,
};

export default config;
