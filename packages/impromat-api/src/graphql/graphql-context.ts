import { Session, SessionData as ExpressSessionData } from "express-session";
import { IncomingMessage } from "http";
import { SessionData } from "../authentication/session-data";
import { Database } from "../database/database";

export type ServerContext = {
  req: IncomingMessage & { session: Session } & {
    session?: ExpressSessionData & { data: SessionData };
  };
};
export type UserContext = {
  session: SessionData | undefined;
  database: Database;
};

export type GraphQLContext = ServerContext & UserContext;
