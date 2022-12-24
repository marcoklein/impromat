import { rootLogger } from "../logger";
import { AppDatabase } from "./database-type";

export function enableAutoLogin(database: AppDatabase) {
  const logger = rootLogger.extend("enable-auto-login");
  if (process.env.REACT_APP_AUTO_LOGIN) {
    console.warn(
      "REACT_APP_AUTO_LOGIN local storage: impromat-auto-login",
      localStorage.getItem("impromat-auto-login"),
    );
    console.warn("REACT_APP_AUTO_LOGIN is set. Auto login is enabled.");
    if (localStorage.getItem("impromat-auto-login") !== "true") {
      localStorage.setItem("impromat-auto-login", "true");
      try {
        database.me
          .insert({ id: "me", user: "test-user", version: 0 })
          .catch(() => {
            logger(
              "REACT_APP_AUTO_LOGIN: Me already exists. Skipping creation.",
            );
          });
        database.users
          .insert({
            id: "test-user",
            version: 0,
            favoriteElements: [],
          })
          .catch(() => {
            logger(
              "REACT_APP_AUTO_LOGIN: Test user already exists. Skipping creation.",
            );
          });
      } catch {}
    } else {
      console.warn(
        "REACT_APP_AUTO_LOGIN: Auto login triggered already. Skipping login.",
      );
    }
  }
}
