import express from "express";
import { initGoogleAuth } from "./authentication/google-auth";
import { initExpressSessions } from "./authentication/init-session";
import { FileDatabase } from "./database/file-database";
import { environment } from "./environment";
import { createGraphQLServer } from "./graphql/create-graphql-server";

export async function createExpressApp() {
  const app = express();
  initExpressSessions(app);
  initGoogleAuth(app);
  const database = new FileDatabase(environment.STORAGE_PATH);
  database.load();
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    console.log("Starting in production mode.");
  } else {
    console.log("Starting in development mode.");
  }

  app.use("/graphql", await createGraphQLServer({ database, isProduction }));
  return app;
}
