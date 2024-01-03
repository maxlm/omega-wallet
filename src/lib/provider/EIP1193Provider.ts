// export interface ProviderRpcError extends Error {
//   message: string;
//   code: number;
//   data?: unknown;
// }

// export interface ProviderMessage {
//   type: string;
//   data: unknown;
// }

// export interface ProviderInfo {
//   chainId: string;
// }

export type RequestArguments = {
  method: string;
  params?: unknown[] | Record<string, unknown>;
};

export enum ProviderRpcErrorCodes {
  UserRejectedRequest = 4001,
  Unauthorized = 4100,
  UnsupportedMethod = 4200,
  Disconnected = 4900,
  ChainDisconnected = 4901,
}

export interface ProviderRpcError {
  message: string;
  code: number;
  data?: unknown;
}
// export interface SimpleEventEmitter {
//   // add listener
//   on(event: string, listener: any): void;
//   // add one-time listener
//   once(event: string, listener: any): void;
//   // remove listener
//   removeListener(event: string, listener: any): void;
//   // removeListener alias
//   off(event: string, listener: any): void;
// }

// export interface EIP1193Provider extends SimpleEventEmitter {
//   // connection event
//   on(event: 'connect', listener: (info: ProviderInfo) => void): void;
//   // disconnection event
//   on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
//   // arbitrary messages
//   on(event: 'message', listener: (message: ProviderMessage) => void): void;
//   // chain changed event
//   on(event: 'chainChanged', listener: (chainId: string) => void): void;
//   // accounts changed event
//   on(event: 'accountsChanged', listener: (accounts: string[]) => void): void;
//   // make an Ethereum RPC method call.
//   request(args: RequestArguments): Promise<unknown>;
// }

export interface Eip1193Provider extends Record<string, any> {
  /**
   *  See [[link-eip-1193]] for details on this method.
   */
  request<T>(request: RequestArguments): Promise<Partial<T> | null | undefined>;
  // [key: string]: unknown;
}
