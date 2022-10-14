import { Express } from "express";
import session, { SessionOptions } from "express-session";
import sessionFileStore from "session-file-store";
import { v4 as uuidv4 } from "uuid";
import { environment } from "../environment";
import path from "node:path";
const FileStore = sessionFileStore(session);

export function initExpressSessions(app: Express) {
  const sessionOptions: SessionOptions = {
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
