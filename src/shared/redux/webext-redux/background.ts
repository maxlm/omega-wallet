import { delay } from '../../utils';
import { ERROR_SYMBOL } from './shared';

// this is a workaround/extension to  webext-redux
// main goal is to be able to pass errors from background to actions that triggered epics in UI
// here we apply error symbol to our payload when error must be shown on client

// for actual error handling see useAction in redux/hooks/useAction
export async function dispatchResponder(dispatchResult, send) {
  // there is some time lag until result being populated
  await delay(2);
  Promise.resolve(dispatchResult)
    .then(res => {
      if (Boolean(res?.meta?.error)) {
        send({
          error: null,
          value: {
            // send payload with ERROR_SYMBOL instead of error
            // because webext-redux will wrap error into Error object
            payload: {
              [ERROR_SYMBOL]: res.meta.error,
            },
          },
        });
      } else {
        send({
          error: null,
          value: res,
        });
      }
    })
    .catch(err => {
      send({
        error: err.message,
        value: null,
      });
    });
}
