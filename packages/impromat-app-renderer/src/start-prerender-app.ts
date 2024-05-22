import { load } from 'cheerio';
import express, { Request, Response } from 'express';
import { DynamicSitemap } from './dynamic-sitemap';
import { WebBrowser } from './web-browser';

const cache = new Map<string, string>();

/**
 * Starts server that prerenders the impromat app.
 *
 * @param port The port number on which the server should listen.
 * @param clientPort The port number on which the client app server is listening.
 * @returns A promise that resolves when the server starts listening.
 */
export function startPrerenderApp(
  port: number,
  clientPort: number,
  apiGraphqlEndpoint: string
) {
  const webBrowser = new WebBrowser();
  const sitemap = new DynamicSitemap(apiGraphqlEndpoint);
  const app = express();

  // sitemap.txt
  app.get('/sitemap.txt', async (req: Request, res: Response) => {
    console.log('sitemap.txt Request: ', req.url);
    const sitemapContent = await sitemap.getSitemapTxt();
    // send text file
    res.setHeader('Content-Type', 'text/plain');
    res.send(sitemapContent);
  });

  // attach all static files to the express server
  app.use(express.static('../impromat/dist', { index: false }));

  // serve all static files directly (e.g. images, fonts, etc.)
  app.get('*.*', (req: Request, res: Response) => {
    console.log('Static file Request: ', req.url);
    res.sendFile(req.url);
  });

  // prerender all html pages (e.g. no file extension)
  app.get('*', async (req: Request, res: Response) => {
    console.log('Dynamic page request: ', req.url);
    const html = await handlePageRequest(req.url);
    res.send(html);
  });

  async function handlePageRequest(url: string) {
    console.log('cache size: ', cache.size);
    if (cache.has(url)) {
      return cache.get(url);
    }
    const pageHtml = await webBrowser.getPageHtml(
      `http://localhost:${clientPort}${url}`
    );
    const $ = load(pageHtml);
    $('head style').remove();
    const html = $.html();
    cache.set(url, html);
    return html;
  }

  const listenPromise = new Promise<typeof app>((resolve) => {
    app.listen(port, () => {
      console.log(`Listening on port http://localhost:${port}`);
      resolve(app);
    });
  });

  return listenPromise;
}
