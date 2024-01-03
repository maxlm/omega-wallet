import { ethRpcRequestAction } from '@root/src/dApp/rpc/actions';
import { Rpc } from '../rpc/WindowPostMessageRpc';
import { Eip1193Provider, RequestArguments } from './EIP1193Provider';
import { selectProviderAction } from '@root/src/dApp/inpage-interaction/actions';
import { EIP6963ProviderInfo } from '../EIP6963';

export class InjectedProvider implements Eip1193Provider {
  public isOmegaWallet = true;
  constructor(private rpc: Rpc) {}
  request<T extends any = unknown>(request: RequestArguments): Promise<Partial<T>> {
    const { method: requestMethod, params } = request;
    const method = requestMethod === 'eth_requestAccounts' ? 'eth_accounts' : requestMethod;
    const rpcCallAction = ethRpcRequestAction<RemapForInpage>({
      data: {
        method,
        params,
      },
    });
    return this.rpc.call(rpcCallAction.type, rpcCallAction.payload);
  }

  requestProvider(providerInfo: EIP6963ProviderInfo[]) {
    const action = selectProviderAction<RemapForInpage>({
      data: providerInfo,
    });
    return this.rpc.call<{ providerId: string }>(action.type, action.payload);
  }
}
