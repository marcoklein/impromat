import { Test } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaServiceMockProvider } from 'test/prisma-service-mock';
import { ElementService } from '../element/element.service';
import { LLMService } from '../llm/llm.service';
import { ElementSummaryService } from './element-summary.service';

describe('ElementSummaryService', () => {
  let service: ElementSummaryService;
  let llmService: DeepMockProxy<LLMService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ElementSummaryService,
        PrismaServiceMockProvider,
        { provide: LLMService, useValue: mockDeep(LLMService) },
        { provide: ElementService, useValue: mockDeep(ElementService) },
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

  it('should trigger the expected LLM request', async () => {
    // given
    const inputMarkdown = 'i'.repeat(301);
    const input = {
      elementId: 'elementId',
      markdown: inputMarkdown,
      name: 'name',
      languageCode: 'en',
    };
    llmService.run.mockResolvedValue('llm-response');
    // when
    await service.createSummary(input);
    // then
    expect(llmService.run).toHaveBeenCalledWith({
      languageCode: 'en',
      temperature: undefined,
      systemPromptDe:
        'Deine Aufgabe ist es den folgenden Text in zwei Sätzen zusammenzufassen',
      systemPromptEn:
        'Your task is to create a VERY SHORT summary of the presented text. Keep it to a maximum of 20 words!',
      text: inputMarkdown,
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
    llmService.run.mockResolvedValue(undefined);
    // when
    const result = await service.createSummary(input);
    // then
    expect(result).toBeUndefined();
  });
});
