import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

export type KeyStorage = {
  key: string;
  secured: boolean;
};
export const keyStorage = createStorage<KeyStorage>(
  'key-storage',
  { key: '', secured: false },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);
