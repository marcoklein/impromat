export type UnpackArray<T> = T extends Array<infer U> ? U : T;
