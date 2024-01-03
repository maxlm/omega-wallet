import { createAction } from '@root/src/shared/redux/createAction';
import { EthRpcRequestAction, RpcActionTypes } from './actionTypes';

export const ethRpcRequestAction = createAction<EthRpcRequestAction>(RpcActionTypes.ETH_RPC_REQUEST);
