import { Epic, ofType } from 'redux-observable';
import { ExtensionInteractionActionTypes, ProviderSelectedAction, SelectProviderAction } from './actionTypes';
import { mergeMap } from 'rxjs';
import { DependencyContainer } from '../dependencies';
import { emptyAction } from '@root/src/shared/redux/redux-observable/helpers';
import { popupRoutes } from '@root/src/shared/routing/popupRoutes';
import { ProviderRpcError, ProviderRpcErrorCodes } from '@root/src/lib/provider/EIP1193Provider';
import { delay } from '@root/src/shared/utils';

export const promptSelectProviderEpic: Epic = (action$, _, { extensionApi }: DependencyContainer) =>
  action$.pipe(
    ofType(ExtensionInteractionActionTypes.PROMPT_SELECT_PROVIDER),
    mergeMap(async (action: SelectProviderAction) => {
      try {
        const { messageId, senderId } = action.payload;
        extensionApi.openPopupWindow({
          route: popupRoutes['/select-wallet-provider'],
          qs: `messageId=${messageId}&senderId=${senderId}`,
          onClose: async () => {
            const error: ProviderRpcError = {
              // Or Unauthorized ? Not sure which is less confusing in given scope
              code: ProviderRpcErrorCodes.UserRejectedRequest,
              message: 'User cancelled provider selection',
            };
            // we get onClose on provider selection as well
            // wait a bit to make sure that proper meesage arrived
            await delay(100);
            await extensionApi.tabs.sendMessage({
              tabId: senderId,
              messageId,
              data: { error },
            });
          },
        });
      } catch (error) {}
    }),
    emptyAction(),
  );

export const providerSelectedEpic: Epic = (action$, _, { extensionApi }: DependencyContainer) =>
  action$.pipe(
    ofType(ExtensionInteractionActionTypes.PROVIDER_SELECTED),
    mergeMap(async (action: ProviderSelectedAction) => {
      try {
        const { messageId, senderId, data } = action.payload;
        await extensionApi.tabs.sendMessage({
          tabId: senderId,
          messageId,
          data: {
            response: data,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
    emptyAction(),
  );

export default [promptSelectProviderEpic, providerSelectedEpic];
