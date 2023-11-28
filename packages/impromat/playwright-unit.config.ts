import { defineConfig, devices } from "@playwright/experimental-ct-react";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./src",
  snapshotDir: "./__snapshots__",
  snapshotPathTemplate: "{snapshotDir}/{testFilePath}/{arg}{ext}",
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report-unit" }],
    ["junit", { outputFile: "component-junit-results.xml" }],
  ],
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
  },

  expect: {
    toHaveScreenshot: {
      // There are differences between browsers, so we allow a small difference.
      maxDiffPixelRatio: 0.1,
    },
  },

  projects: [
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
