import { EIP6963ProviderDetail, requestProvider } from './EIP6963';
import { Eip1193Provider, RequestArguments } from './provider/EIP1193Provider';
import { InjectedProvider } from './provider/InjectedProvider';

export class InpageProvider implements Eip1193Provider {
  public providerDetails: EIP6963ProviderDetail[];
  private _owProvider: InjectedProvider;
  private _currentProvider: Eip1193Provider;
  constructor() {
    this.providerDetails = [];
    this._init();
  }
  public async request<T = unknown>(request: RequestArguments): Promise<Partial<T>> {
    if (!this._currentProvider) {
      const response = await this._promptSelectProvider();
      if (response?.providerId) {
        const selectedProvider = this.providerDetails.find(detail => detail.info.uuid === response.providerId);
        if (selectedProvider) {
          // while we have set it, we remember user decision.
          // until next page reload
          this._currentProvider = selectedProvider.provider;
        }
      }
    }

    return this._currentProvider.request(request);
  }

  private _init = () => {
    requestProvider(info => {
      if (this._existsProviderDetail(info)) {
        return;
      }
      if (info.provider instanceof InjectedProvider) {
        this._owProvider = info.provider;
      }
      this.providerDetails.push(info);
    });
  };
  private _existsProviderDetail = newProviderDetail => {
    const existingProvider = this.providerDetails.find(
      providerDetail =>
        providerDetail.info && newProviderDetail.info && providerDetail.info.uuid === newProviderDetail.info.uuid,
    );

    return !!existingProvider;
  };
  private _promptSelectProvider = () => {
    return this._owProvider.requestProvider(this.providerDetails.map(detail => detail.info));
  };
}
