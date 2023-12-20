import { Inject, Injectable, Logger } from '@nestjs/common';
import { LLMResponse } from './llm-response';
import { PromiseQueue } from './promise-queue';

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

  constructor(
    @Inject(PromiseQueue) private queue: PromiseQueue<LLMResponse | undefined>,
  ) {}

  async runRequest(request: LLMRequest): Promise<LLMResponse | undefined> {
    const promise = () =>
      new Promise<LLMResponse | undefined>(async (resolve, reject) => {
        try {
          const response = await this.processRequest(request);
          resolve(response);
        } catch (e) {
          this.logger.error('Error during runRequest:');
          if (e instanceof Error) {
            this.logger.error(e.name);
            this.logger.error(e.stack);
            this.logger.error(e.message);
          }
          reject(e);
        }
      });

    return this.queue.add(promise, request.prompt);
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
