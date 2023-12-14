import { Inject, Injectable, Logger } from '@nestjs/common';
import { ElementLLMService } from './element-llm.service';

export interface ElementSummaryInput {
  elementId: string;
  name: string;
  markdown: string;
  languageCode: string;
}

/**
 * Create summaries of elements.
 */
@Injectable()
export class ElementSummaryService {
  private readonly logger = new Logger(ElementSummaryService.name);
  private readonly MIN_SUMMARY_LENGTH = 300;

  constructor(
    @Inject(ElementLLMService) private llmService: ElementLLMService,
  ) {}

  async createSummary({
    elementId,
    markdown,
    name,
    languageCode,
  }: ElementSummaryInput): Promise<string | undefined> {
    if (markdown.length < this.MIN_SUMMARY_LENGTH) {
      this.logger.debug(
        `Element ${name} has less than 300 characters. Using existing markdown as summary.`,
      );
      return markdown;
    }
    const maxWords = 20;
    const systemPromptEn = `Your task is to create a VERY SHORT summary of the presented text. Keep it to a maximum of ${maxWords} words!`;
    const systemPromptDe =
      'Deine Aufgabe ist es den folgenden Text in zwei Sätzen zusammenzufassen';

    this.logger.debug(`Creating summary for element ${name} (${elementId})`);
    const result = await this.llmService.run({
      systemPromptEn,
      systemPromptDe,
      languageCode,
      text: markdown,
      temperature: languageCode === 'de' ? 0.1 : undefined,
    });

    if (!result) {
      this.logger.warn(`Could not create summary for element ${name}`);
      return undefined;
    }

    this.logger.debug(`Created summary for element ${name}`);
    return result;
  }
}
