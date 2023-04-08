const exclude = [/page-cache/];

export function createLogger(namespace: string) {
  return {
    log(...optionalParameters: any[]) {
      if (!exclude.some((pattern) => namespace.match(pattern))) {
        console.log(`${namespace}:`, ...optionalParameters);
      }
    },
  };
}
