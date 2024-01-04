import { ofType, Epic } from 'redux-observable';
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
  restoreWalletRequestAction,
} from './actions';
import { concatActions, emptyAction } from '@root/src/shared/redux/redux-observable/helpers';
import { DependencyContainer } from '../dependencies';

export const createWalletEpic: Epic = (action$, _, { walletApi, appStorage, memoryStore }: DependencyContainer) =>
  action$.pipe(
    ofType(WalletActionTypes.CREATE_WALLET_REQUEST),
    mergeMap(async (action: CreateWalletRequestAction) => {
      try {
        let password = action.payload.password;
        const { wallet, phrase } = walletApi.createWallet(action.payload.phrase);
        const balance = await walletApi.getBalance(wallet.address);
        const key = CryptoJS.AES.encrypt(wallet.privateKey, password);
        appStorage.keyStorage.set(prev => {
          return {
            ...prev,
            key,
            secured: !!password,
          };
        });

        await memoryStore.setPassword(password);

        createWalletSuccessAction({
          address: wallet.address,
          secured: false,
          balance,
          phrase,
          requirePassword: !Boolean(password),
        });
      } catch (error) {
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

        return restoreWalletSuccessAction({
          address: wallet.address,
          balance,
          secured: Boolean(password),
          requirePassword: !Boolean(password),
        });
      } catch (error) {
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
        return initWalletSuccessAction({
          hasWalletStored: !!key,
          secured,
          requirePassword: !password,
        });
      } catch (error) {
        return restoreWalletErrorAction({ error });
      }
    }),
    concatActions(),
  );

export const setPasswordEpic: Epic = (action$, _, { memoryStore }: DependencyContainer) =>
  action$.pipe(
    ofType(WalletActionTypes.SET_PASSWORD),
    mergeMap(async (action: SetPasswordAction) => {
      const { password } = action.payload;
      await memoryStore.setPassword(password);
    }),
    emptyAction(),
  );
export default [createWalletEpic, restoreWalletEpic, initWalletEpic, setPasswordEpic];
