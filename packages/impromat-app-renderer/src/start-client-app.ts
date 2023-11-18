import express from "express";

/**
 * Starts the client app server on the specified port.
 *
 * The client is the Single Page Application (SPA) of impromat.
 *
 * @param clientPort The port number on which the server should listen.
 * @returns A promise that resolves when the server starts listening.
 */
export async function startClientApp(clientPort: number) {
  const impromatApp = express();
  impromatApp.use(express.static("../impromat/build", { cacheControl: false }));
  impromatApp.get("*", (req, res) => {
    console.log("App Server Request: ", req.url);
    res.setHeader("Cache-Control", "max-age=0");
    res.sendFile("index.html", { root: "../impromat/build" });
  });
  const listenPromise = new Promise<void>((resolve) => {
    impromatApp.listen(clientPort, () => {
      console.log(
        `App Server Listening on port http://localhost:${clientPort}`
      );
      resolve();
    });
  });
  return listenPromise;
}
