import { AppState } from '../reducer';

export const selectIsWalletStored = (state: AppState) => state.wallet.hasWalletStored;

export const defaultCurentWallet = {
  address: undefined,
  balance: undefined,
  phrese: undefined,
};

export const selectCurrentWallet = (state: AppState): { address?: string; balance?: string; phrase?: string } => {
  if (!state.wallet.address) {
    return defaultCurentWallet;
  }
  return {
    address: state.wallet.address,
    balance: state.wallet.balance,
  };
};

export const selectWalletPhrase = (state: AppState) => state.wallet.phrase || '';

export const selectRequirePassword = (state: AppState) => state.wallet.requirePassword;
