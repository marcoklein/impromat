import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { rootLogger } from "./logger";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

if (process.env.NODE_ENV === "development") {
  localStorage.setItem("debug", "impromat:*");
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log("WebWorker: on success");
  },
  onUpdate: async (registration) => {
    console.log("WebWorker: on update");
    // TODO pass into app to show a toast
    await registration.update();
    console.log("WebWorker: update successful");
    if (window.confirm("New version available. Install now?")) {
      window.stop();
      window.location.reload();
    }
  },
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
    <App />,
  </React.StrictMode>,
);
