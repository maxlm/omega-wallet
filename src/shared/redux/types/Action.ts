export type Action<T, P = void, M = Record<string, any>> = {
  type: T;
  payload: P;
  meta?: M;
};
