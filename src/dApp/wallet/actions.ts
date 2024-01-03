import {
  CreateWalletErrorAction,
  CreateWalletRequestAction,
  CreateWalletSuccessAction,
  InitWalletRequestAction,
  InitWalletSuccessAction,
  RestoreWalletErrorAction,
  RestoreWalletRequestAction,
  RestoreWalletSuccessAction,
  SetPasswordAction,
  WalletActionTypes,
} from './actionTypes';

import { createAction } from '@root/src/shared/redux/createAction';

export const initWalletRequestAction = createAction<InitWalletRequestAction>(WalletActionTypes.INIT_WALLET_REQUEST);

export const initWalletSuccessAction = createAction<InitWalletSuccessAction>(WalletActionTypes.INIT_WALLET_SUCCESS);

export const createWalletRequestAction = createAction<CreateWalletRequestAction>(
  WalletActionTypes.CREATE_WALLET_REQUEST,
);

export const createWalletSuccessAction = createAction<CreateWalletSuccessAction>(
  WalletActionTypes.CREATE_WALLET_SUCCESS,
);

export const createWalletErrorAction = createAction<CreateWalletErrorAction>(WalletActionTypes.CREATE_WALLET_ERROR);

export const restoreWalletRequestAction = createAction<RestoreWalletRequestAction>(
  WalletActionTypes.RESTORE_WALLET_REQUEST,
);

export const restoreWalletSuccessAction = createAction<RestoreWalletSuccessAction>(
  WalletActionTypes.RESTORE_WALLET_SUCCESS,
);

export const restoreWalletErrorAction = createAction<RestoreWalletErrorAction>(WalletActionTypes.RESTORE_WALLET_ERROR);

export const setPasswordAction = createAction<SetPasswordAction>(WalletActionTypes.SET_PASSWORD);
