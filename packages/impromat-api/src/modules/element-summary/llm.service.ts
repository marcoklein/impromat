import { Injectable, Logger } from '@nestjs/common';
import { LLMResponse } from './llm-response';

export type LLMRequest = {
  model: string;
  system: string;
  prompt: string;
  template?: string;
  temperature?: number;
};

@Injectable()
export class LLMService {
  private readonly logger = new Logger(LLMService.name);
  private queue: LLMRequest[] = [];
  private currentPromise: Promise<LLMResponse | undefined> | undefined;
  private requestPrompts = new Set<string>();

  async runRequest(request: LLMRequest): Promise<LLMResponse | undefined> {
    const requestId = request.prompt;
    if (this.requestPrompts.has(requestId)) {
      this.logger.log(`Request ${requestId} is already in progress. Skipping.`);
      return undefined;
    }

    this.requestPrompts.add(requestId);
    this.queue.push(request);
    if (!this.currentPromise) {
      void this.runNextRequest();
    }
    return this.currentPromise;
  }

  private async runNextRequest(): Promise<LLMResponse | undefined> {
    this.logger.log(`Running next request. Queue length: ${this.queue.length}`);
    const request = this.queue.shift();
    if (!request) {
      this.currentPromise = undefined;
      return undefined;
    }

    this.currentPromise = this.processRequest(request);
    await this.currentPromise;
    void this.runNextRequest();
  }

  private async processRequest(
    request: LLMRequest,
  ): Promise<LLMResponse | undefined> {
    const { model, system, prompt, template, temperature } = request;
    const url = process.env.OLLAMA_ENDPOINT ?? 'http://0.0.0.0:11434';
    const generateEndpoint = '/api/generate';
    this.logger.debug('Using ollama endpoint: ' + url);
    try {
      this.logger.debug('Verifying that ollama is running...');
      const response = await fetch(`${url}`);
      if (!response.ok) {
        throw new Error('Ollama is not running.');
      }
      this.logger.debug('Ollama is running.');
    } catch (e) {
      this.logger.error(
        'Ollama is not running. Please start it with `ollama serve`.',
      );
      if (e instanceof Error) {
        this.logger.error(e.name);
        this.logger.error(e.stack);
        this.logger.error(e.message);
      }
      return undefined;
    }
    try {
      this.logger.debug('Sending request to ollama with the following text:');
      this.logger.verbose(system);
      this.logger.verbose(prompt);
      const response = await fetch(`${url}${generateEndpoint}`, {
        body: JSON.stringify({
          model,
          system,
          prompt,
          template,
          data: {
            // test with 0.1 - 0.01
            temperature: temperature ?? 0.01,
          },
          stream: false,
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const json: LLMResponse = await response.json();
      this.logger.debug('Received response from ollama:');
      this.logger.verbose(json.response);
      return json;
    } catch (e) {
      this.logger.error('Error while sending request to ollama:');
      this.logger.error(e);
      if (e instanceof Error) {
        this.logger.error(e.name);
        this.logger.error(e.stack);
        this.logger.error(e.message);
      }
    }
    return undefined;
  }
}
