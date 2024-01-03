import { produce } from 'immer';

import { ExtensionInteractionActionTypes, SelectProviderAction } from './actionTypes';
import { EIP6963ProviderInfo } from '@root/src/lib/EIP6963';

export interface RInpageInteraction {
  providersBySender: Record<string, EIP6963ProviderInfo[]>;
}

export const appInitialState = (): RInpageInteraction => ({
  providersBySender: {},
});

type InteractActions = SelectProviderAction;

const inpageInteractionReducer = produce(function (draft: RInpageInteraction, action: InteractActions) {
  switch (action.type) {
    case ExtensionInteractionActionTypes.PROMPT_SELECT_PROVIDER: {
      const { data, senderId } = action.payload;
      draft.providersBySender = {
        ...draft.providersBySender,
        [`${senderId}`]: data,
      };
      break;
    }
  }
}, appInitialState());

export default inpageInteractionReducer;
