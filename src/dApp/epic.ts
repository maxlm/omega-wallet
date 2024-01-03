import { Epic, combineEpics } from 'redux-observable';
import walletEpics from './wallet/epics';
import inpageInteractionEpics from './inpage-interaction/epics';
import rpcEpics from './rpc/epics';

const epics: Epic<any, any, any, any>[] = [];

export default combineEpics(...epics.concat(walletEpics, inpageInteractionEpics, rpcEpics));
