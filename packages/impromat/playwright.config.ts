import type { PlaywrightTestConfig } from "@playwright/test";
declare const process: any;

const config: PlaywrightTestConfig = {
  webServer: {
    command: process.env.CI
      ? "yarn build && yarn build:serve -p 3000"
      : "yarn start",
    env: {
      REACT_APP_AUTO_LOGIN: "1",
    },
    port: 3000,
    timeout: 2 * 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
    viewport: { width: 360, height: 800 },
    ignoreHTTPSErrors: true,
    isMobile: true,
    baseURL: "http://localhost:3000/",
  },
  timeout: 60 * 1000,
};

export default config;
