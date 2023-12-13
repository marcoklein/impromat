import { Inject, Injectable, Logger } from '@nestjs/common';
import { LLMRequest, LLMService } from './llm.service';

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

  constructor(@Inject(LLMService) private llmService: LLMService) {}

  async createSummary({
    elementId,
    markdown,
    name,
    languageCode,
  }: ElementSummaryInput): Promise<string | undefined> {
    this.logger.debug(`Creating summary for element ${elementId}`);

    const preprocessedMarkdown = markdown
      .replace(/\n/g, ' ')
      .replace(/#/g, '')
      .replace(/-/g, '')
      .replace(/\//g, '')
      .replace(/\d+/g, '')
      .replace(/_/g, '')
      .replace(/\*/g, '')
      .replace(/\s+/g, ' ');

    if (markdown.length < this.MIN_SUMMARY_LENGTH) {
      this.logger.debug(
        `Element ${name} has less than 300 characters. Using existing markdown as summary.`,
      );
      return markdown;
    }

    const maxWords = 20;
    const systemPromptEn = `Your task is to create a VERY SHORT summary of the presented text. Keep it to a maximum of ${maxWords} words!`;
    const paramsEn: LLMRequest = {
      model: 'mistral',
      system: systemPromptEn,
      prompt: preprocessedMarkdown,
    };

    const templateDe = '{{ .System }} USER: {{ .Prompt }} ASSISTANT:';
    const systemPromptDe =
      'Deine Aufgabe ist es den folgenden Text in zwei Sätzen zusammenzufassen';
    const paramsDe: LLMRequest = {
      model: 'mistral-de',
      system: systemPromptDe,
      prompt: preprocessedMarkdown,
      template: templateDe,
      temperature: 0.1,
    };

    const params = languageCode === 'de' ? paramsDe : paramsEn;
    const summaryResponse = await this.llmService.runRequest(params);

    if (
      !summaryResponse ||
      !summaryResponse.done ||
      !summaryResponse.response ||
      !summaryResponse.response.trim().length ||
      summaryResponse.response.trim() === preprocessedMarkdown
    ) {
      this.logger.warn(
        `No summary for element ${name} could be created. See above logs for details. Return last summary.`,
      );
      this.logger.warn(summaryResponse);
      return undefined;
    }
    const summaryLength = summaryResponse.response.trim().length;
    this.logger.debug(`Summary length: ${summaryLength}`);

    return summaryResponse.response.trim();
  }
}
