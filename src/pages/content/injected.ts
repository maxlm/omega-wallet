import { connectToBackground, getBaseURL } from '@root/src/shared/browser/extension';

function injectScript(scriptPath: string) {
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', scriptPath);

  document.body.appendChild(script);
}
void injectScript(`${getBaseURL()}/pages/inpage/index.js`);

function setupIO() {
  const background = connectToBackground(`inpage->content->background`);

  chrome.runtime.onMessage.addListener(message => {
    const { mesageId, ...rest } = message;
    window.dispatchEvent(new CustomEvent(message.messageId, { detail: JSON.stringify(rest) }));
  });

  window.addEventListener(
    'message',
    event => {
      if (event.source !== window) return;
      if (!event.data) return;
      const { messageId, method, params } = event.data;
      if (!messageId || !method) return;

      background.postMessage({
        messageId,
        method,
        params,
      });
    },
    false,
  );
}

setupIO();
