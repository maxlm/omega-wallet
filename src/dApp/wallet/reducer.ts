import { produce } from 'immer';

import {
  WalletActionTypes,
  CreateWalletSuccessAction,
  RestoreWalletSuccessAction,
  InitWalletSuccessAction,
} from './actionTypes';

export interface RWallet {
  secured: boolean;
  requirePassword: boolean;
  address?: string;
  balance?: string;
  hasWalletStored: boolean;
  phrase?: string;
}

export const appInitialState = (): RWallet => ({
  secured: false,
  hasWalletStored: false,
  requirePassword: true,
});

type WalletActions = CreateWalletSuccessAction | RestoreWalletSuccessAction | InitWalletSuccessAction;

const appReducer = produce(function (draft: RWallet, action: WalletActions) {
  switch (action.type) {
    case WalletActionTypes.CREATE_WALLET_SUCCESS:
    case WalletActionTypes.RESTORE_WALLET_SUCCESS: {
      const { address, balance, secured, phrase, requirePassword } = action.payload;
      draft.address = address;
      draft.balance = balance;
      draft.secured = secured;
      draft.phrase = phrase;
      draft.requirePassword = requirePassword;
      break;
    }
    case WalletActionTypes.INIT_WALLET_SUCCESS: {
      const { hasWalletStored, secured, requirePassword } = action.payload;
      draft.hasWalletStored = hasWalletStored;
      draft.secured = secured;
      draft.requirePassword = requirePassword;
    }
  }
}, appInitialState());

export default appReducer;
