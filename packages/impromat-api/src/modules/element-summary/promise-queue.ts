import { Injectable } from '@nestjs/common';

@Injectable()
export class PromiseQueue<T> {
  keys = new Set<string>();
  queue = Promise.resolve();

  add(operation: Promise<T>, key?: string): Promise<T> | undefined {
    if (key) {
      if (this.keys.has(key)) {
        return undefined;
      }
      this.keys.add(key);
    }
    return new Promise<T>((resolve, reject) => {
      this.queue = this.queue
        .then(async () => await operation)
        .then(resolve)
        .catch(reject);
    });
  }
}
