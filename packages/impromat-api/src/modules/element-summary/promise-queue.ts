import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PromiseQueue<T> {
  private readonly logger = new Logger(PromiseQueue.name);
  keys = new Set<string>();
  queue = Promise.resolve();
  queueSize = 0;

  add(operation: () => Promise<T>, key?: string): Promise<T> | undefined {
    if (key) {
      if (this.keys.has(key)) {
        return undefined;
      }
      this.keys.add(key);
    }
    this.queueSize++;
    this.logger.debug(`Added element. Queue size: ${this.queueSize}`);
    return new Promise<T>((resolve, reject) => {
      this.queue = this.queue
        .then(() => {
          return operation();
        })
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.queueSize--;
          this.logger.debug(`Completed element. Queue size: ${this.queueSize}`);

          if (key) {
            this.keys.delete(key);
          }
        });
    });
  }
}
