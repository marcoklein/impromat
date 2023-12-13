import { Test } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ElementSummaryService } from './element-summary.service';
import { LLMResponse } from './llm-response';
import { LLMService } from './llm.service';

describe('ElementSummaryService', () => {
  let service: ElementSummaryService;
  let llmService: DeepMockProxy<LLMService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ElementSummaryService,
        { provide: LLMService, useValue: mockDeep(LLMService) },
      ],
    }).compile();

    service = moduleRef.get(ElementSummaryService);
    llmService = moduleRef.get(LLMService);
  });

  it('should return the input markdown if it is shorter than 300 characters', async () => {
    // given
    const input = {
      elementId: 'elementId',
      markdown: 'short',
      name: 'name',
      languageCode: 'en',
    };
    // when
    const result = await service.createSummary(input);
    // then
    expect(result).toEqual('short');
  });

  it('should trigger the expected LLM request for English', async () => {
    // given
    const inputMarkdown = 'i'.repeat(301);
    const input = {
      elementId: 'elementId',
      markdown: inputMarkdown,
      name: 'name',
      languageCode: 'en',
    };
    llmService.runRequest.mockResolvedValue({
      done: true,
      response: 'llm-response',
    } as LLMResponse);
    // when
    await service.createSummary(input);
    // then
    expect(llmService.runRequest).toHaveBeenCalledWith({
      model: 'mistral',
      system:
        'Your task is to create a VERY SHORT summary of the presented text. Keep it to a maximum of 20 words!',
      prompt: inputMarkdown,
    });
  });

  it('should trigger the expected LLM request for German', async () => {
    // given
    const inputMarkdown = 'i'.repeat(301);
    const input = {
      elementId: 'elementId',
      markdown: inputMarkdown,
      name: 'name',
      languageCode: 'de',
    };
    llmService.runRequest.mockResolvedValue({
      done: true,
      response: 'llm-response',
    } as LLMResponse);
    // when
    await service.createSummary(input);
    // then
    expect(llmService.runRequest).toHaveBeenCalledWith({
      model: 'mistral-de',
      system:
        'Deine Aufgabe ist es den folgenden Text in zwei Sätzen zusammenzufassen',
      prompt: inputMarkdown,
      template: '{{ .System }} USER: {{ .Prompt }} ASSISTANT:',
      temperature: 0.1,
    });
  });

  it('should return undefined if the LLM request fails', async () => {
    // given
    const inputMarkdown = 'i'.repeat(301);
    const input = {
      elementId: 'elementId',
      markdown: inputMarkdown,
      name: 'name',
      languageCode: 'en',
    };
    llmService.runRequest.mockResolvedValue(undefined);
    // when
    const result = await service.createSummary(input);
    // then
    expect(result).toBeUndefined();
  });
});
