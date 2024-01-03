import { Action } from '@root/src/shared/redux/types/Action';

export enum WalletActionTypes {
  //create wallet
  CREATE_WALLET_REQUEST = 'CREATE_WALLET_REQUEST',
  CREATE_WALLET_SUCCESS = 'CREATE_WALLET_SUCCESS',
  CREATE_WALLET_ERROR = 'CREATE_WALLET_ERROR',

  //restore wallet
  RESTORE_WALLET_REQUEST = 'RESTORE_WALLET_REQUEST',
  RESTORE_WALLET_SUCCESS = 'RESTORE_WALLET_SUCCESS',
  RESTORE_WALLET_ERROR = 'RESTORE_WALLET_ERROR',

  ERASE_PHRASE = 'ERASE_PHRASE',

  SET_PASSWORD = 'SET_PASSWORD',

  //init wallet
  INIT_WALLET_REQUEST = 'INIT_WALLET_REQUEST',
  INIT_WALLET_SUCCESS = 'INIT_WALLET_SUCCESS',
}

export type InitWalletRequestAction = Action<typeof WalletActionTypes.INIT_WALLET_REQUEST>;
export type InitWalletSuccessAction = Action<
  typeof WalletActionTypes.INIT_WALLET_SUCCESS,
  {
    hasWalletStored: boolean;
    secured: boolean;
    requirePassword: boolean;
  }
>;

export type CreateWalletRequestAction = Action<
  typeof WalletActionTypes.CREATE_WALLET_REQUEST,
  {
    password: string;
    phrase?: string;
  }
>;

export type CreateWalletSuccessAction = Action<
  typeof WalletActionTypes.CREATE_WALLET_SUCCESS,
  {
    address: string;
    balance: string;
    secured: boolean;
    phrase: string;
    requirePassword: boolean;
  }
>;
export type CreateWalletErrorAction = Action<
  typeof WalletActionTypes.CREATE_WALLET_ERROR,
  {
    error: unknown;
  }
>;

export type RestoreWalletRequestAction = Action<
  typeof WalletActionTypes.RESTORE_WALLET_REQUEST,
  {
    password?: string;
  }
>;

export type RestoreWalletSuccessAction = Action<
  typeof WalletActionTypes.RESTORE_WALLET_SUCCESS,
  {
    address: string;
    balance: string;
    secured: boolean;
    phrase?: string;
    requirePassword: boolean;
  }
>;

export type RestoreWalletErrorAction = Action<
  typeof WalletActionTypes.RESTORE_WALLET_ERROR,
  {
    error: unknown;
  }
>;

export type SetPasswordAction = Action<
  typeof WalletActionTypes.SET_PASSWORD,
  {
    password: string;
  }
>;
