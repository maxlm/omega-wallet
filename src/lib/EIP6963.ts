import { Eip1193Provider } from './provider/EIP1193Provider';

enum EIP6963EventNames {
  Announce = 'eip6963:announceProvider',
  Request = 'eip6963:requestProvider',
}

export type EIP6963ProviderInfo = {
  // a globally unique identifier the Wallet Provider that MUST be (UUIDv4 compliant)
  // to uniquely distinguish different EIP-1193
  uuid: string;
  // a human-readable local alias of the Wallet Provider to be displayed to the user on the DApp
  name: string;
  //a URI pointing to an image. The image SHOULD be a square with 96x96px minimum resolution.
  icon: string;
  // The Wallet MUST supply the rdns property which is intended to be a domain name
  //from the Domain Name System
  // in reverse syntax ordering such as com.example.subdomain.
  rdns: string;
};

export type EIP6963RequestProviderEvent = Event & {
  type: EIP6963EventNames.Request;
};

export type EIP6963ProviderDetail = {
  info: EIP6963ProviderInfo;
  provider: Eip1193Provider;
};

export type EIP6963AnnounceProviderEvent = CustomEvent & {
  type: EIP6963EventNames.Announce;
  detail: EIP6963ProviderDetail;
};

/**
 * Intended to be used by a dapp.
 */
export function requestProvider<HandlerReturnType>(
  handleProvider: (providerDetail: EIP6963ProviderDetail) => HandlerReturnType,
): void {
  window.addEventListener(EIP6963EventNames.Announce, (event: EIP6963AnnounceProviderEvent) => {
    handleProvider(event.detail);
  });

  window.dispatchEvent(new Event(EIP6963EventNames.Request));
}

/**
 * Intended to be used by a wallet. Announces a provider by dispatching
 */
export function announceProvider(providerDetail: EIP6963ProviderDetail): void {
  const { info, provider } = providerDetail;

  const _announceProvider = () =>
    window.dispatchEvent(
      new CustomEvent(EIP6963EventNames.Announce, {
        detail: Object.freeze({ info: { ...info }, provider }),
      }),
    );

  _announceProvider();
  window.addEventListener(EIP6963EventNames.Request, (event: EIP6963RequestProviderEvent) => {
    _announceProvider();
  });
}
