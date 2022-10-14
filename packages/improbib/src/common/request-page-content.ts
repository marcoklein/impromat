import https from "node:https";
import http from "node:http";

/**
 * Retrieves content of url through GET request. Uses http or https depending on the protocol of the specified url.
 *
 * @param url Url to page.
 * @returns Page content.
 */
export async function requestPageContent(url: string): Promise<
  | {
      redirectedToUrl: string | undefined;
      content: string;
    }
  | undefined
> {
  return new Promise<
    { redirectedToUrl: string | undefined; content: string } | undefined
  >((resolve, reject) => {
    (url.startsWith("http:") ? http : https)
      .get(url, async (response) => {
        if (response.statusCode === 301) {
          const location = response.headers.location;
          if (!location) {
            console.warn(
              `requestPageContent: request to ${url} returned a redirect without location header.`,
            );
            resolve(undefined);
            return;
          }

          const result = await requestPageContent(location);
          if (!result) {
            resolve(undefined);
            return;
          }

          const { content } = result;
          resolve({ redirectedToUrl: location, content });
          return;
        }

        if (
          response.statusCode === 302 ||
          response.statusCode === 404 ||
          response.statusCode === 500
        ) {
          console.warn(
            "Url not found: " + url + ". Status code: " + response.statusCode,
          );
          resolve(undefined);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error("Status code is " + response.statusCode));
          return;
        }

        let content = "";
        response.on("data", (chunk) => {
          content += chunk;
        });
        response.on("end", () => {
          resolve({ redirectedToUrl: undefined, content });
        });
      })
      .on("error", (error) => {
        reject(error);
      })
      .end();
  });
}
