import { setupIonicReact } from "@ionic/react";
import i18n from "i18next";
import React from "react";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { registerSW } from "virtual:pwa-register";
import { App } from "./App";
import { AppWrapper } from "./AppWrapper";
import { rootLogger } from "./logger";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "development") {
  localStorage.setItem("debug", "impromat:*");
}
const intervalMS = 60 * 1000;

const updateSW = registerSW({
  onRegisteredSW(swUrl, registration) {
    registration &&
      setInterval(async () => {
        if (!(!registration.installing && navigator)) return;

        if ("connection" in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
          cache: "no-store",
          headers: {
            cache: "no-store",
            "cache-control": "no-cache",
          },
        });

        if (resp?.status === 200) await registration.update();
      }, intervalMS);
  },
  onNeedRefresh() {
    updateSW(true);
  },
  onOfflineReady() {},
});

i18n.use(initReactI18next).init({
  resources: {
    en: {
      // namespaces have same name as component
      NotFoundPage: {
        "Page does not exist": "Ups, this page does not exist.",
        "Go to home page": "Go to home page",
      },
      PrivacyPolicyPage: {
        "Privacy Policy": "Privacy Policy",
      },
    },
    de: {
      NotFoundPage: {
        "Page does not exist": "Ups, diese Seite existiert nicht.",
        "Go to home page": "Zur Startseite",
      },
      PrivacyPolicyPage: {
        "Privacy Policy": "Datenschutzerklärung",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
const logger = rootLogger.extend("reportWebVitals");
reportWebVitals(logger);

setupIonicReact();

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
);
