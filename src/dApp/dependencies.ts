import walletApi, { initApi } from '@root/src/api/wallet';
import { config } from '../config';
import { appStorage } from '../api/storage';
import { extensionApi } from '../api/extension';
import { memoryStore } from '../api/memoryStore';

initApi(config.NetworkUrl);

export type DependencyContainer = {
  walletApi: typeof walletApi;
  appStorage: typeof appStorage;
  extensionApi: typeof extensionApi;
  memoryStore: typeof memoryStore;
};

export function configureDependencies(): DependencyContainer {
  return Object.freeze({ walletApi, appStorage, extensionApi, memoryStore });
}
