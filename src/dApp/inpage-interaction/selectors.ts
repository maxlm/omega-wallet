import { AppState } from '../reducer';

export const selectSenderProviders = (state: AppState, senderId: number) => {
  return state.inpageInteraction.providersBySender[`${senderId}`];
};
