import { Express } from "express";
import fs from "fs";
import { OAuth2Client } from "google-auth-library";
import { environment } from "../environment";
import { SessionData } from "./session-data";

// TODO transform google auth into an envelop plugin e.g. https://www.envelop.dev/docs/plugins/custom-plugin to add it dynamically to our GraphQL server if necessary
let _oAuth2Client: OAuth2Client | undefined;
let javascriptOrigin: string | undefined;

function getOAuth2Client() {
  if (_oAuth2Client) return _oAuth2Client;
  if (fs.existsSync(environment.GOOGLE_AUTH_JSON_PATH)) {
    console.log(
      `Retrieving Google auth from JSON path ${environment.GOOGLE_AUTH_JSON_PATH}`
    );
    const OAuth2Data = JSON.parse(
      fs.readFileSync(environment.GOOGLE_AUTH_JSON_PATH).toString()
    );
    const CLIENT_ID = OAuth2Data.web.client_id;
    const CLIENT_SECRET = OAuth2Data.web.client_secret;
    const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];
    javascriptOrigin = OAuth2Data.web.javascript_origins[0];
    _oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
    return _oAuth2Client;
  }

  console.log("Retrieving Google auth environment");
  const CLIENT_ID = environment.GOOGLE_AUTH_CLIENT_ID;
  const CLIENT_SECRET = environment.GOOGLE_AUTH_CLIENT_SECRET;
  const REDIRECT_URL = environment.GOOGLE_AUTH_REDIRECT_URL;
  _oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
  return _oAuth2Client;
}

export function generateGoogleAuthUrl() {
  const oAuth2Client = getOAuth2Client();
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.email"],
  });
  return url;
}

export function initGoogleAuth(app: Express) {
  const oAuth2Client = getOAuth2Client();
  app.get<{}, {}, {}, { code: string }, {}>(
    "/auth/google/callback",
    async function (req, res) {
      const code = req.query.code as string;
      if (code) {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        const { sub: userGoogleId } = await oAuth2Client.getTokenInfo(
          tokens.access_token!
        );

        if (!userGoogleId) {
          res.status(500);
          res.send("Token information incomplete.");
          console.error("Token information incomplete.");
          return;
        }
        req.session = req.session ?? {};
        const sessionData: SessionData = (req.session as any)?.data ?? {
          userId: userGoogleId,
        };
        (req.session as any).data = sessionData;
        console.log(`Redirecting to ${javascriptOrigin}`);
        res.redirect(javascriptOrigin!);
      }
    }
  );
}
