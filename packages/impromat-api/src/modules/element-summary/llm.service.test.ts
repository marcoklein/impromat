import { Test } from '@nestjs/testing';
import { LLMResponse } from './llm-response';
import { LLMRequest, LLMService } from './llm.service';
import { PromiseQueue } from './promise-queue';

describe('LLMService', () => {
  let service: LLMService;
  let mockRequest: LLMRequest;
  let mockResponse: LLMResponse;

  beforeEach(async () => {
    mockRequest = {
      model: 'test',
      system: 'test',
      prompt: 'test',
      template: 'test',
      temperature: 0.5,
    };
    mockResponse = {
      done: true,
      total_duration: 0,
      load_duration: 0,
      sample_count: 0,
      sample_duration: 0,
      prompt_eval_count: 0,
      prompt_eval_duration: 0,
      eval_count: 0,
      eval_duration: 0,
      context: [],
      response: 'test-response',
    };

    const moduleRef = await Test.createTestingModule({
      providers: [LLMService, PromiseQueue],
    }).compile();
    service = moduleRef.get(LLMService);

    (global as any).fetch = jest.fn(() => ({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    }));
  });

  describe('runRequest', () => {
    it('should return undefined if request is already in progress', async () => {
      // when
      const firstRequest = service.runRequest(mockRequest);
      const secondRequest = service.runRequest(mockRequest);

      // then
      const [firstResponse, secondResponse] = await Promise.all([
        firstRequest,
        secondRequest,
      ]);
      expect(firstResponse).toEqual(mockResponse);
      expect(secondResponse).toBeUndefined();
    });

    it('should return response if request is not in progress', async () => {
      // when
      const response = await service.runRequest(mockRequest);
      // then
      expect(response).toEqual(mockResponse);
    });

    it('should run multiple requests sequentially', async () => {
      // when
      const firstRequest = service.runRequest(mockRequest);
      mockRequest.prompt = 'test2';
      const secondRequest = service.runRequest(mockRequest);
      mockRequest.prompt = 'test3';
      const thirdRequest = service.runRequest(mockRequest);

      // then
      const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
        firstRequest,
        secondRequest,
        thirdRequest,
      ]);
      expect(firstResponse).toEqual(mockResponse);
      expect(secondResponse).toEqual(mockResponse);
      expect(thirdResponse).toEqual(mockResponse);
    });
  });
});
