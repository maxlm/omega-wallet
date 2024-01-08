import { type Epic } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
import {
  CreateWalletRequestAction,
  InitWalletRequestAction,
  RestoreWalletRequestAction,
  SetPasswordAction,
  WalletActionTypes,
} from './actionTypes';
import {
  restoreWalletSuccessAction,
  createWalletSuccessAction,
  createWalletErrorAction,
  restoreWalletErrorAction,
  initWalletSuccessAction,
} from './actions';
import {
  concatActions,
  emptyAction,
  notifyFail,
  notifySuccess,
  ofType,
} from '@root/src/shared/redux/redux-observable/helpers';
import { DependencyContainer } from '../dependencies';

export const createWalletEpic: Epic = (action$, _, { walletApi, appStorage, memoryStore }: DependencyContainer) =>
  action$.pipe(
    ofType(WalletActionTypes.CREATE_WALLET_REQUEST),
    mergeMap(async (action: CreateWalletRequestAction) => {
      try {
        const password = action.payload.password;
        const { wallet, phrase } = walletApi.createWallet(action.payload.phrase);
        const balance = await walletApi.getBalance(wallet.address);
        const key = CryptoJS.AES.encrypt(wallet.privateKey, password).toString();
        appStorage.keyStorage.set(prev => {
          return {
            ...prev,
            key,
            secured: !!password,
          };
        });

        await memoryStore.setPassword(password);
        notifySuccess(action);
        return createWalletSuccessAction({
          address: wallet.address,
          secured: false,
          balance,
          phrase,
          requirePassword: !password,
        });
      } catch (error) {
        notifyFail(action, error);
        return createWalletErrorAction({ error });
      }
    }),
    concatActions(),
  );

export const restoreWalletEpic: Epic = (action$, _, { walletApi, appStorage, memoryStore }: DependencyContainer) =>
  action$.pipe(
    ofType(WalletActionTypes.RESTORE_WALLET_REQUEST),
    mergeMap(async (action: RestoreWalletRequestAction) => {
      try {
        const password = await memoryStore.getPassword();
        const { key, secured } = await appStorage.keyStorage.get();
        if (!password && secured) {
          throw new Error("can't restore without password");
        }
        const bytes = CryptoJS.AES.decrypt(key, password);
        const privateKey = bytes.toString(CryptoJS.enc.Utf8);
        const wallet = walletApi.loadWallet(privateKey);
        const balance = await walletApi.getBalance(wallet.address);
        notifySuccess(action);
        return restoreWalletSuccessAction({
          address: wallet.address,
          balance,
          secured: Boolean(password),
          requirePassword: !password,
        });
      } catch (error) {
        notifyFail(action, error.message || 'Unexpected error: failed to restore wallet');
        return restoreWalletErrorAction({ error });
      }
    }),
    concatActions(),
  );

export const initWalletEpic: Epic = (action$, _, { appStorage, memoryStore }: DependencyContainer) =>
  action$.pipe(
    ofType(WalletActionTypes.INIT_WALLET_REQUEST),
    mergeMap(async (action: InitWalletRequestAction) => {
      try {
        const { key, secured } = await appStorage.keyStorage.get();
        const password = await memoryStore.getPassword();
        notifySuccess(action);
        return initWalletSuccessAction({
          hasWalletStored: !!key,
          secured,
          requirePassword: !password,
        });
      } catch (error) {
        notifyFail(action, error.message);
        return restoreWalletErrorAction({ error });
      }
    }),
    concatActions(),
  );

export const setPasswordEpic: Epic = (action$, _, { memoryStore, appStorage }: DependencyContainer) =>
  action$.pipe(
    ofType(WalletActionTypes.SET_PASSWORD),
    mergeMap(async (action: SetPasswordAction) => {
      const { password } = action.payload;
      const { key: originalKey } = await appStorage.keyStorage.get();
      let decrypted: string;
      try {
        decrypted = CryptoJS.AES.decrypt(originalKey, password).toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
          throw {
            message: 'wrong password',
          };
        }
        await memoryStore.setPassword(password);
        notifySuccess(action);
      } catch (e) {
        notifyFail(action, e.message);
      }
    }),
    emptyAction(),
  );
export default [createWalletEpic, restoreWalletEpic, initWalletEpic, setPasswordEpic];
