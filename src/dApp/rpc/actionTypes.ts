import { RequestArguments as EIP1193RequestArguments } from '@root/src/lib/provider/EIP1193Provider';
import { Action } from '@root/src/shared/redux/types/Action';

export enum RpcActionTypes {
  ETH_RPC_REQUEST = 'ETH_RPC_REQUEST',
}

export type InpageInteractionPayload<TData = unknown> = {
  senderId?: number;
  messageId: number | string;
  data?: TData;
};

export type EthRpcRequestAction = Action<
  typeof RpcActionTypes.ETH_RPC_REQUEST,
  InpageInteractionPayload<EIP1193RequestArguments>
>;
