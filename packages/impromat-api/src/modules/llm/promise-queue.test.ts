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
      const operation = () => Promise.resolve('test');

      // when
      const result = service.add(operation);

      // then
      expect(result).toBeDefined();
      await expect(result).resolves.toBe('test');
    });

    it('should start three operations and execute one after the other', async () => {
      // given
      let operation1Resolved = false;
      let operation2Resolved = false;
      let operation3Resolved = false;
      const operation1 = async () => {
        operation1Resolved = true;
        return 'test1';
      };
      const operation2 = async () => {
        operation2Resolved = true;
        return 'test2';
      };
      const operation3 = async () => {
        operation3Resolved = true;
        return 'test3';
      };

      // when
      const result1 = service.add(operation1);
      const result2 = service.add(operation2);
      const result3 = service.add(operation3);

      // then
      await result1;
      expect(operation1Resolved).toBe(true);
      expect(operation2Resolved).toBe(false);
      expect(operation3Resolved).toBe(false);
      await result2;
      expect(operation1Resolved).toBe(true);
      expect(operation2Resolved).toBe(true);
      expect(operation3Resolved).toBe(false);
      const awaitedResult3 = await result3;
      expect(operation1Resolved).toBe(true);
      expect(operation2Resolved).toBe(true);
      expect(operation3Resolved).toBe(true);

      expect(awaitedResult3).toBe('test3');
      const awaitedResult2 = await result2;
      expect(awaitedResult2).toBe('test2');
      const awaitedResult1 = await result1;
      expect(awaitedResult1).toBe('test1');
    });

    it('should not start operation if operation with same key is in progress', async () => {
      // given
      const operation1 = () =>
        new Promise<string>((resolve) => {
          setTimeout(() => resolve('test1'), 100);
        });
      const operation2 = () =>
        new Promise<string>((resolve) => {
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
