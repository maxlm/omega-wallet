import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import { wrapStore } from '@eduardoac-skimlinks/webext-redux';
import { handleConnection } from '@root/src/shared/browser/extension';
import { configureStore } from '@root/src/dApp/configureStore';
import { configureDependencies } from '@root/src/dApp/dependencies';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
// reloadOnUpdate('pages/content/style.scss');

const store = configureStore({ dependencies: configureDependencies() });
store.runSideEffects();
wrapStore(store);
console.log('background loaded');

export type InpageMessageRequest = {
  messageId: string | number;
  params: any;
  method: string;
};

handleConnection(connection => {
  connection.onMessage.addListener((message: InpageMessageRequest, port) => {
    store.dispatch<any>({
      type: message.method,
      payload: {
        ...(message.params || {}),
        senderId: port.sender?.tab.id,
        messageId: message.messageId,
      },
    });
  });
});
