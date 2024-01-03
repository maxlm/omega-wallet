import { createAction } from '@root/src/shared/redux/createAction';
import {
  ExtensionInteractionActionTypes,
  ProviderSelectedAction,
  SelectProviderAction,
  ClearProviderSelection,
} from './actionTypes';

export const selectProviderAction = createAction<SelectProviderAction>(
  ExtensionInteractionActionTypes.PROMPT_SELECT_PROVIDER,
);

export const providerSelectedAction = createAction<ProviderSelectedAction>(
  ExtensionInteractionActionTypes.PROVIDER_SELECTED,
);

export const clearProviderSelection = createAction<ClearProviderSelection>(
  ExtensionInteractionActionTypes.CLEAR_PROVIDER_SELECTION,
);
