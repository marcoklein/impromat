import { Injectable } from '@nestjs/common';

import {
  GamePromptWithTagsOutput,
  LevelPromptDe,
  processPrompt,
} from 'impromat-ai';

export interface AIElementInput {
  id: string;
  name: string;
  tags: string[];
  markdown: string;
  languageCode: string;
}

@Injectable()
export class ElementAIService {
  async predictLevelTags(element: AIElementInput): Promise<
    | {
        prompt: string;
        tags: { name: string; reason: string }[];
        message: string;
      }
    | undefined
  > {
    let prompt: GamePromptWithTagsOutput | undefined = undefined;
    if (element.languageCode === 'de') {
      prompt = new LevelPromptDe(element);
    }
    if (!prompt) return undefined;

    console.log('Predicting level tags');
    const { message, parsedResponse } = await processPrompt(prompt);

    return {
      prompt: prompt.createPrompt(),
      tags: parsedResponse,
      message: message.content ?? '',
    };
  }
}
