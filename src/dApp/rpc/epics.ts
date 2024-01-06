import { Epic, ofType, StateObservable } from 'redux-observable';
import { EthRpcRequestAction, RpcActionTypes } from './actionTypes';
import { mergeMap } from 'rxjs';
import { DependencyContainer } from '../dependencies';
import { emptyAction } from '@root/src/shared/redux/redux-observable/helpers';
import { ProviderRpcError, ProviderRpcErrorCodes } from '@root/src/lib/provider/EIP1193Provider';

import { AppState } from '../reducer';
import { popupRoutes } from '@root/src/shared/routing/popupRoutes';

export const rpcEpic: Epic<unknown, unknown, AppState> = (
  action$,
  state$,
  { extensionApi, walletApi, appStorage }: DependencyContainer,
) =>
  action$.pipe(
    ofType(RpcActionTypes.ETH_RPC_REQUEST),
    mergeMap(async (action: EthRpcRequestAction) => {
      const { messageId, senderId, data } = action.payload;

      const { key } = await appStorage.keyStorage.get();

      const userHasWallet = Boolean(key);
      const requirePassword = state$.value.wallet.requirePassword;

      const sendRequest = async () => {
        try {
          const response = await walletApi.request(data.method, data.params);
          await extensionApi.tabs.sendMessage({
            tabId: senderId,
            messageId,
            data: {
              response,
            },
          });
        } catch (error) {
          await extensionApi.tabs.sendMessage({
            tabId: senderId,
            messageId,
            data: {
              error,
            },
          });
        }
      };

      if (!userHasWallet) {
        extensionApi.openPopupWindow();
        await extensionApi.tabs.sendMessage({
          tabId: senderId,
          messageId,
          data: {
            error: {
              code: ProviderRpcErrorCodes.Unauthorized,
              message: 'No wallet found',
            } as ProviderRpcError,
          },
        });
        return;
      }

      if (requirePassword) {
        extensionApi.openPopupWindow({
          route: popupRoutes['/enter-password'],
          qs: '__bg=true',
          onClose: async () => {
            // try send request when user entered password
            await sendRequest();
          },
        });

        return;
      }

      await sendRequest();
    }),
    emptyAction(),
  );

export default [rpcEpic];
