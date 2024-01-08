import { ERROR_SYMBOL } from './shared';

// this is a workaround/extension to  webext-redux
// main goal is to be able to pass errors from background to actions that triggered epics in UI
// here we apply error symbol to our payload when error must be shown on client
// this allows following error passing mechanism bypassing store:

//  AppPage.tsx
//      const action = useActionAsync(actionCreator)
//      try {
//          await action(payload)
//      } catch (e) {
//          showErrorOnUI(e.message)
//      }

//  epics.ts
//   mergeMap(async (action: ReduxAction) => {
//       try {
//          await doSomething();
//          notifySuccess(action)
//      } catch(error) {
//          notifyError(action, error.message)
//      }
//   })
//
// As for me notifySuccess/notifyError is good tradeoff. As you can await actual action completion
//and not keep ephemeral network state inside store. Especially when that store needs to be synced each time with content scripts

// for actual error handling see useActionAsync in redux/hooks/useAction
export async function dispatchResponder(dispatchResult, send) {
  try {
    // our own completion or rejection from notifySuccess/notifyError
    await Promise.resolve(dispatchResult?.meta?.promise);
    // initial webex-redux error handling. dispatchResult might be rejected promise
    // if shit happened inside store.dispatch()
    const res = await Promise.resolve(dispatchResult);
    send({
      error: null,
      value: res,
    });
  } catch (e) {
    send({
      error: null,
      value: {
        // send payload with ERROR_SYMBOL instead of error
        // because webext-redux will wrap error into Error object
        // useActionAsync will reject client promise if will see ERROR_SYMBOL in payload
        payload: {
          [ERROR_SYMBOL]: { message: e.message },
        },
      },
    });
  }
}
