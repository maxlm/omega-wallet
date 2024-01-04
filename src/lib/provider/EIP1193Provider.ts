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

export interface Eip1193Provider extends Record<string, any> {
  /**
   *  See [[link-eip-1193]] for details on this method.
   */
  request<T>(request: RequestArguments): Promise<Partial<T> | null | undefined>;
}
