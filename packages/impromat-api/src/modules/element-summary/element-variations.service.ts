import { Inject, Injectable, Logger } from '@nestjs/common';
import { ElementLLMService } from './element-llm.service';

export interface ElementVariationsInput {
  elementId: string;
  name: string;
  markdown: string;
  languageCode: string;
}

export interface ElementVariationsOutput {
  variations: string[];
}

@Injectable()
export class ElementVariationsService {
  private logger = new Logger(ElementVariationsService.name);

  constructor(
    @Inject(ElementLLMService) private elementLLMService: ElementLLMService,
  ) {}

  async detectVariations(
    input: ElementVariationsInput,
  ): Promise<{ name: string; description: string }[] | undefined> {
    this.logger.debug(
      `Creating variations for element ${input.name} (${input.elementId})`,
    );
    const variations = await this.elementLLMService.run({
      languageCode: input.languageCode,
      systemPromptDe: `Deine Aufgabe ist es alle im folgenden Text beschriebenen Varianten auszulesen. Sammle zuerst alle Varianten Namen in einer kurzen Liste. Gib danach die Varianten als JSON zurück: \`[{ "Name": "Titel der Variante aus dem Text", "Beschreibung": "Beschreibung der Variante aus dem Text" }, { "Name": "Titel der Variante aus dem Text", "Beschreibung": "Beschreibung der Variante aus dem Text" }]\``,
      systemPromptEn:
        'Your task is to extract all variations described in the following text. First, collect all variation names in a short list. Then return the variations as JSON: `[{ "Name": "Title of the variation from the text", "Description": "Description of the variation from the text" }, { "Name": "Title of the variation from the text", "Description": "Description of the variation from the text" }]`',
      text: input.markdown,
      noMarkdownPreprocessing: true,
    });

    if (!variations) {
      this.logger.warn(`Could not create variations for element ${input.name}`);
      return undefined;
    }

    const variationsLine = variations.replace(/\n/g, ' ');
    const match = variationsLine.match(/(\[.*\])/);
    let extractedText: string | undefined = undefined;
    if (match) {
      extractedText = match[0];
    }

    try {
      const jsonResult = JSON.parse(extractedText ?? '[]');
      this.logger.debug(`Raw variations: ${jsonResult}`);
      const filteredVariations = jsonResult.filter((result: any) => {
        if (input.markdown.includes(result.Name)) {
          return true;
        }
        return false;
      });
      this.logger.debug(
        `Filtered Variations: ${JSON.stringify(filteredVariations)}`,
      );
      this.logger.debug(`Created variations for element ${input.name}`);
      return filteredVariations.map((result: any) => {
        return {
          name: result.Name,
          description: result.Beschreibung ?? result.Description,
        };
      });
    } catch (e) {
      this.logger.warn(`Error while parsing variations: ${e}`);
      this.logger.debug('Extracted text:');
      this.logger.debug(extractedText);
      return undefined;
    }
  }
}
