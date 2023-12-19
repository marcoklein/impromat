import { Test } from '@nestjs/testing';
import { PromiseQueue } from './promise-queue';

describe('PromiseQueue', () => {
  let service: PromiseQueue<string>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PromiseQueue],
    }).compile();
    service = moduleRef.get(PromiseQueue);
  });

  describe('add', () => {
    it('should start operation if no operation is in progress', async () => {
      // given
      const operation = Promise.resolve('test');

      // when
      const result = service.add(operation);

      // then
      expect(result).toBeDefined();
      await expect(result).resolves.toBe('test');
    });

    it('should start three operations and execute one after the other', async () => {
      // given
      const operation1 = new Promise<string>((resolve) => {
        setTimeout(() => resolve('test1'), 100);
      });
      const operation2 = new Promise<string>((resolve) => {
        setTimeout(() => resolve('test2'), 50);
      });
      const operation3 = new Promise<string>((resolve) => {
        setTimeout(() => resolve('test3'), 25);
      });

      // when
      const result1 = service.add(operation1);
      const result2 = service.add(operation2);
      const result3 = service.add(operation3);

      // then
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
      expect(result3).toBeDefined();
      await expect(result1).resolves.toBe('test1');
      await expect(result2).resolves.toBe('test2');
      await expect(result3).resolves.toBe('test3');
    });

    it('should not start operation if operation with same key is in progress', async () => {
      // given
      const operation1 = new Promise<string>((resolve) => {
        setTimeout(() => resolve('test1'), 100);
      });
      const operation2 = new Promise<string>((resolve) => {
        setTimeout(() => resolve('test2'), 50);
      });

      // when
      const result1 = service.add(operation1, 'key');
      const result2 = service.add(operation2, 'key');

      // then
      expect(result1).toBeDefined();
      expect(result2).toBeUndefined();
      await expect(result1).resolves.toBe('test1');
    });
  });
});
