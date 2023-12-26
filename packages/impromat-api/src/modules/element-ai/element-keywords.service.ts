import { Inject, Injectable, Logger } from '@nestjs/common';
import { ElementLLMService } from './element-llm.service';

export interface ElementKeywordsInput {
  elementId: string;
  name: string;
  markdown: string;
  languageCode: string;
}

export interface ElementKeywordsOutput {
  keywords: string[];
}

@Injectable()
export class ElementKeywordsService {
  private logger = new Logger(ElementKeywordsService.name);

  constructor(
    @Inject(ElementLLMService) private elementLLMService: ElementLLMService,
  ) {}

  async detectKeywords(
    input: ElementKeywordsInput,
  ): Promise<{ name: string; description: string }[] | undefined> {
    this.logger.debug(
      `Creating keywords for element ${input.name} (${input.elementId})`,
    );
    const keywordsResponse = await this.elementLLMService.run({
      languageCode: input.languageCode,
      systemPromptDe:
        'Deine Aufgabe ist es die wichtigsten Schlüsselwörter aus dem folgenden Text zu extrahieren. Gib die Antwort als JSON Array zurück: `["<Erstes Schlüsselwort>", "<Zweites Schlüsselwort>"]`',
      systemPromptEn:
        'Your task is to extract the most important keywords from the following text. Return them as a JSON array: ["Keyword 1", "Keyword 2", "Keyword 3"]',
      text: input.markdown,
      temperature: 0,
      noMarkdownPreprocessing: false,
    });

    if (!keywordsResponse) {
      this.logger.warn(`Could not create keywords for element ${input.name}`);
      return undefined;
    }

    const keywordsLine = keywordsResponse.replace(/\n/g, ' ');
    const match = keywordsLine.match(/(\[.*\])/);
    let extractedText: string | undefined = undefined;
    if (match) {
      extractedText = match[0];
    }

    try {
      const jsonResult = JSON.parse(extractedText ?? '[]');
      this.logger.debug(`Raw keywords: ${jsonResult}`);

      this.logger.debug(`Filtered Keywords: ${JSON.stringify(jsonResult)}`);
      this.logger.debug(`Created keywords for element ${input.name}`);
      return jsonResult;
    } catch (e) {
      this.logger.warn(`Error while parsing keywords: ${e}`);
      this.logger.debug('Extracted text:');
      this.logger.debug(extractedText);
      return undefined;
    }
  }
}
