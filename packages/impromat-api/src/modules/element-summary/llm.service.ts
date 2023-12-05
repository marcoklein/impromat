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

  async runRequest({
    model,
    system,
    prompt,
    template,
    temperature,
  }: LLMRequest): Promise<LLMResponse | undefined> {
    try {
      this.logger.debug('Sending request to ollama with the following text:');
      this.logger.verbose(system);
      this.logger.verbose(prompt);
      const response = await fetch('http://127.0.0.1:11434/api/generate', {
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
      this.logger.error(e);
    }
    return undefined;
  }
}
