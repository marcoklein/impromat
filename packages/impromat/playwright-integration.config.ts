import type { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
declare const process: any;

dotenv.config({ path: ".env.test-integration-app" });

const PORT = Number(process.env.PORT);
if (!PORT) throw new Error("PORT environment variable undefined.");

const config: PlaywrightTestConfig = {
  webServer: {
    command: "yarn start",
    port: PORT,
    timeout: 4 * 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    browserName: "chromium",
    headless: true,
    viewport: { width: 360, height: 600 },
    ignoreHTTPSErrors: true,
    isMobile: true,
    baseURL: `http://localhost:${PORT}/`,
    actionTimeout: 5 * 1000,
    permissions: ["clipboard-read", "clipboard-write"],
  },
  expect: {
    timeout: 15 * 1000,
    toHaveScreenshot: {
      // There are differences between browsers, so we allow a small difference.
      maxDiffPixelRatio: 0.1,
    },
  },
  testDir: "test/component",
  snapshotDir: "./__snapshots__",
  snapshotPathTemplate: "{snapshotDir}/{testFilePath}/{arg}{ext}",
  reporter: [
    ["list"],
    ["html"],
    ["junit", { outputFile: "junit-results.xml" }],
  ],
  fullyParallel: false,
  retries: 2,
  timeout: 30 * 1000,
};

export default config;
