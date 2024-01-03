import { Store } from '@eduardoac-skimlinks/webext-redux';
export function createProxyStore() {
  // proxy store implementation is a class
  // it looses it's context at some point
  // which leads to this.whatever undefined or wrong object in worst case
  const store = new Store();

  const bindMethods = [
    'ready',
    'subscribe',
    'patchState',
    'replaceState',
    'getState',
    'replaceReducer',
    'dispatch',
    'initializeStore',
  ] as const;

  bindMethods.forEach(method => (store[method] = store[method].bind(store)));

  return store;
}
