import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  LLMRequest,
  LLMRequestQueueService,
} from './llm-request-queue.service';

export interface ElementLLMInput {
  systemPromptEn: string;
  systemPromptDe: string;
  languageCode: string;
  text: string;
  noMarkdownPreprocessing?: boolean;
  temperature?: number;
}

@Injectable()
export class LLMService {
  private readonly logger = new Logger(LLMService.name);

  constructor(
    @Inject(LLMRequestQueueService)
    private llmRequestQueueService: LLMRequestQueueService,
  ) {}

  async run({
    systemPromptDe,
    systemPromptEn,
    languageCode,
    text: markdown,
    noMarkdownPreprocessing: cleanText,
    temperature,
  }: ElementLLMInput): Promise<string | undefined> {
    const preprocessedMarkdown = cleanText
      ? markdown
      : this.cleanMarkdown(markdown);

    const paramsEn: LLMRequest = {
      model: 'mistral',
      system: systemPromptEn,
      prompt: preprocessedMarkdown,
      temperature: temperature,
    };

    const templateDe = '{{ .System }} USER: {{ .Prompt }} ASSISTANT:';
    const paramsDe: LLMRequest = {
      model: 'mistral-de',
      system: systemPromptDe,
      prompt: preprocessedMarkdown,
      template: templateDe,
      temperature: temperature,
    };

    const params = languageCode === 'de' ? paramsDe : paramsEn;
    const summaryResponse = await this.llmRequestQueueService.runRequest(
      params,
    );

    if (
      !summaryResponse ||
      !summaryResponse.done ||
      !summaryResponse.response ||
      !summaryResponse.response.trim().length ||
      summaryResponse.response.trim() === preprocessedMarkdown
    ) {
      this.logger.warn(`No response retrieved. See above logs for details..`);
      this.logger.warn(summaryResponse);
      return undefined;
    }
    const summaryLength = summaryResponse.response.trim().length;
    this.logger.debug(`Response length: ${summaryLength}`);

    return summaryResponse.response.trim();
  }

  generateEmbeddings(
    text: string,
    options?: { cleanMarkdown?: boolean },
  ): Promise<number[] | undefined> {
    const model = 'mistral';

    if (options?.cleanMarkdown) {
      text = this.cleanMarkdown(text);
    }

    return this.llmRequestQueueService.generateEmbeddings(model, text);
  }

  private cleanMarkdown(markdown: string): string {
    return markdown
      .replace(/\n/g, ' ')
      .replace(/#/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\//g, ' ')
      .replace(/\d+/g, ' ')
      .replace(/_/g, ' ')
      .replace(/\*/g, ' ')
      .replace(/\s+/g, ' ');
  }
}
