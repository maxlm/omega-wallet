import { Action } from './types/Action';

export type ActionCreator<A extends Action<T, P>, T = A['type'], P = A['payload']> = <Payload = P>(
  payload: Payload extends P ? P : Omit<P, keyof Payload>,
  meta?: Record<string, any>,
) => Action<T, Payload extends P ? P : Omit<P, keyof Payload>>;

export function createAction<A extends Action<T, P>, T = A['type'], P = A['payload']>(type: T) {
  return <Payload = P>(payload: Payload extends P ? P : Omit<P, keyof Payload>, meta = {}) => ({
    type,
    payload,
    meta,
  });
}
