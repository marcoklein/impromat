import { Express } from "express";
import session, { SessionOptions } from "express-session";
import path from "node:path";
import sessionFileStore from "session-file-store";
import { v4 as uuidv4 } from "uuid";
import { environment } from "../environment";
const FileStore = sessionFileStore(session);

export const SESSION_COOKIE_NAME = "connect.sid";

export function initExpressSessions(app: Express) {
  const sessionOptions: SessionOptions = {
    name: SESSION_COOKIE_NAME,
    genid: () => uuidv4(),
    store: new FileStore({
      path: path.join(environment.STORAGE_PATH, "sessions"),
      retries: 1,
      logFn: (...args: any[]) => {},
    }),
    secret: [environment.SESSION_SECRET],
    cookie: {
      sameSite: "strict",
      maxAge: environment.SESSION_MAX_AGE,
      secure: false, // managed by reverse proxy
      httpOnly: true,
      path: "/",
    },
    saveUninitialized: false,
    resave: false,
  };
  app.use(session(sessionOptions));
}
