const elementsQuery = /* GraphQL */ `
  query Elements($skip: Int!, $take: Int!) {
    searchElements(input: { take: $take, skip: $skip }) {
      element {
        id
      }
    }
  }
`;

const knownUrls = ["/nav/home", "/nav/home/about", "/nav/elements"];

export class DynamicSitemap {
  private apiUrl: string;
  private cachedElementUrls: string[] | undefined;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getSitemapTxt() {
    const relativeUrls = [
      ...knownUrls,
      ...(await this.fetchCachedElementUrls()),
    ];
    const absoluteUrls = relativeUrls.map(
      (url) => `https://impromat.app${url}`
    );
    return absoluteUrls.join("\n");
  }

  private async fetchCachedElementUrls() {
    if (!this.cachedElementUrls) {
      try {
        this.cachedElementUrls = await this.fetchAllElementUrls();
      } catch (error) {
        console.log(error);
        console.error("Could not retrieve element urls from API");
      }
    }
    return this.cachedElementUrls ?? [];
  }

  private fetchAllElementUrls() {
    const urls: string[] = [];
    const batchSize = 100;
    let skip = 0;
    return new Promise<string[]>(async (resolve, reject) => {
      while (true) {
        console.log(
          "Fetching elements from API, take: ",
          batchSize,
          "skip: ",
          skip
        );
        let response: Response;
        try {
          response = await this.fetchElementBatch(skip, batchSize);
        } catch (error) {
          console.log(error);
          console.error("Could not retrieve element urls from API");
          reject();
          return;
        }
        const json = await response.json();
        const elements = json.data.searchElements;
        if (elements.length === 0) {
          break;
        }
        for (const element of elements) {
          urls.push(this.createElementUrl(element.element.id));
        }
        skip += batchSize;
      }
      resolve(urls);
    });
  }

  private createElementUrl(elementId: string) {
    return `/element/${elementId}`;
  }

  private fetchElementBatch(skip: number, take: number) {
    return fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: elementsQuery,
        variables: {
          skip,
          take,
        },
      }),
    });
  }
}
