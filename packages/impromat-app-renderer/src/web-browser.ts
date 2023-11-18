import puppeteer, { Browser } from "puppeteer";

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
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
    });
    const pageContent = await page.content();
    await this.releaseBrowser();

    return pageContent;
  }

  private async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        // no need for sandbox as we only serve static files from the impromat app
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      console.log("Created new browser");
    }
    this.browserLocks++;
    console.log("getBrowser Locks: ", this.browserLocks);
    return this.browser;
  }

  private async releaseBrowser() {
    this.browserLocks--;
    console.log("releaseBrowser Locks: ", this.browserLocks);
    if (this.browserLocks <= 0) {
      await this.browser?.close();
      this.browser = undefined;
      console.log("Closed browser");
    }
  }
}
