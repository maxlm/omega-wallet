import { EIP6963ProviderInfo } from '@root/src/lib/EIP6963';
import { Action } from '@root/src/shared/redux/types/Action';

export enum ExtensionInteractionActionTypes {
  PROMPT_SELECT_PROVIDER = 'PROMPT_SELECT_PROVIDER',
  PROVIDER_SELECTED = 'PROVIDER_SELECTED',
  PROVIDER_SELECTION_CANCELLED = 'PROVIDER_SELECTION_CANCELLED',
  CLEAR_PROVIDER_SELECTION = 'CLEAR_PROVIDER_SELECTION',
}

export type InpageInteractionPayload<TData = unknown> = {
  senderId?: number;
  messageId: number | string;
  data?: TData;
};

export type SelectProviderAction = Action<
  typeof ExtensionInteractionActionTypes.PROMPT_SELECT_PROVIDER,
  InpageInteractionPayload<EIP6963ProviderInfo[]>
>;

export type ClearProviderSelection = Action<
  typeof ExtensionInteractionActionTypes.CLEAR_PROVIDER_SELECTION,
  {
    senderId: number;
  }
>;

export type ProviderSelectedAction = Action<
  typeof ExtensionInteractionActionTypes.PROVIDER_SELECTED,
  InpageInteractionPayload<{ providerId: string }>
>;
