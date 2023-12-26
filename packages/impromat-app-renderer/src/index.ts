import { startClientApp } from "./start-client-app";
import { startPrerenderApp } from "./start-prerender-app";

const port = parseInt(process.env.PORT ?? "3080");
const apiEndpoint =
  process.env.API_ENDPOINT ?? "https://api.impromat.app/graphql";
const clientPort = port + 1;

async function main() {
  await startPrerenderApp(port, clientPort, apiEndpoint);
  await startClientApp(clientPort);

  async function prerenderPage(url: string) {
    return new Promise<void>(async (resolve) => {
      console.log("Prerendering page: ", url);
      await fetch(`http://localhost:${port}${url}`);
      console.log("Prerendered page: ", url);
      resolve();
    });
  }

  const startTime = Date.now();
  await Promise.all([
    prerenderPage("/"),
    prerenderPage("/workshops"),
    prerenderPage("/about"),
    prerenderPage("/nav/elements"),
  ]);
  const endTime = Date.now();

  console.log("Time for prerendering: ", endTime - startTime, "ms");
}

main();
