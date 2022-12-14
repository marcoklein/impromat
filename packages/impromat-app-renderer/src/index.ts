import { Request, Response } from "express";
import puppeteer from "puppeteer";
import express from "express";
import { load } from "cheerio";

const port = parseInt(process.env.PORT ?? "3080");
const clientPort = port + 1;

const cache = new Map<string, string>();

const app = express();

app.use(express.static("../impromat/build", { index: false }));
app.get("*.*", (req: Request, res: Response) => {
  console.log("Static file Request: ", req.url);
  res.sendFile(req.url);
});

app.get("*", async (req: Request, res: Response) => {
  console.log("Dynamic page request: ", req.url);
  const html = await handlePageRequest(req.url);
  res.send(html);
});

async function handlePageRequest(url: string) {
  console.log("cache size: ", cache.size);
  if (cache.has(url)) {
    return cache.get(url);
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${clientPort}`, {
    waitUntil: "networkidle0",
  });
  const pageHtml = await page.content();
  const $ = load(pageHtml);
  $("head style").remove();
  const html = $.html();
  cache.set(url, html);
  await browser.close();
  return html;
}

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

const appServer = express();
appServer.use(express.static("../impromat/build"));
appServer.get("*", (req, res) => {
  console.log("App Server Request: ", req.url);
  res.sendFile("index.html");
});
appServer.listen(clientPort, () => {
  console.log(`App Server Listening on port http://localhost:${clientPort}`);

  (async () => {
    console.log("Preloading pages");
    await handlePageRequest("/");
    console.log("/");
    await handlePageRequest("/workshops");
    console.log("/workshops");
    await handlePageRequest("/about");
    console.log("/about");
  })();
});
