import puppeteer, { Browser } from 'puppeteer';

export class WebBrowser {
  private browser: Browser | undefined;
  private browserLocks = 0;

  /**
   * Gets the HTML of the specified page.
   *
   * @param url The URL of the page.
   * @returns The HTML of the page.
   */
  async getPageHtml(url: string) {
    try {
      const browser = await this.getBrowser();
      const page = await browser.newPage();
      try {
        await page.goto(url, {
          waitUntil: 'networkidle0',
        });
        return await page.content();
      } catch (error) {
        console.error('Error getting page content', error);
      } finally {
        console.log('Closing page');
        await page.close();
      }
    } catch (error) {
      console.error('Error getting page content', error);
    } finally {
      await this.releaseBrowser();
    }
  }

  private async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        // no need for sandbox as we only serve static files from the impromat app
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: 'new',
      });
      console.log('Created new browser');
    }
    this.browserLocks++;
    console.log('getBrowser Locks: ', this.browserLocks);
    return this.browser;
  }

  private async releaseBrowser() {
    this.browserLocks--;
    console.log('releaseBrowser Locks: ', this.browserLocks);
    if (this.browserLocks <= 0) {
      console.log('Closing browser');
      await this.browser?.close();
      this.browser = undefined;
      console.log('Closed browser');
    }
  }
}
