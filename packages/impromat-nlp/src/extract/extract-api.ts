import { DocumentExtractor as DocumentExtractor } from "./extract";
import { DocumentModel } from "../model";

const fetchElementsQuery = /* GraphQL */ `
  query Elements($skip: Int!, $take: Int!, $input: ElementSearchInput!) {
    searchElements(input: $input, skip: $skip, take: $take) {
      element {
        id
        name
        markdown
      }
    }
  }
`;

/**
 * Loads elements from the Impromat API.
 */
export class ImpromatApiExtractor implements DocumentExtractor {
  lastSkip = 0;
  apiUrl: string;
  languageCode: string | undefined;

  constructor(apiUrl: string = "http://localhost:8080/graphql") {
    this.apiUrl = apiUrl;
  }

  async extractNext(): Promise<DocumentModel | undefined> {
    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: fetchElementsQuery,
        variables: {
          skip: this.lastSkip,
          take: 1,
          input: {
            languageCode: this.languageCode,
          },
        },
      }),
    });
    const json = await response.json();
    console.log(json);

    const elements: {
      element: { id: string; name: string; markdown: string };
    }[] = json.data.searchElements;
    const element = elements.at(0)?.element;
    console.log("Extracted element:");
    console.log(element);
    this.lastSkip++;
    if (!element) {
      console.log("No more elements to load.");
      return undefined;
    }
    return {
      id: element.id,
      name: element.name,
      markdown: element.markdown,
    };
  }
}
