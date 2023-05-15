import React from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { App } from "./App";
import { AppWrapper } from "./AppWrapper";
import { rootLogger } from "./logger";
import reportWebVitals from "./reportWebVitals";

if (process.env.NODE_ENV === "development") {
  localStorage.setItem("debug", "impromat:*");
}

const updateSW = registerSW({
  onNeedRefresh() {
    if (window.confirm("New version available. Install now?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {},
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
const logger = rootLogger.extend("reportWebVitals");
reportWebVitals(logger);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
);
