import { combineReducers } from 'redux';
import walletReducer, { RWallet } from './wallet/reducer';
import inpageInteractionReducer, { RInpageInteraction } from './inpage-interaction/reducer';
export type AppState = {
  wallet: RWallet;
  inpageInteraction: RInpageInteraction;
};

export default combineReducers({
  wallet: walletReducer,
  inpageInteraction: inpageInteractionReducer,
});
