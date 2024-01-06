import browser, { Tabs, Windows } from 'webextension-polyfill';
import { getBaseURL } from './getBaseUrl';

export async function openTab(params: Tabs.CreateCreatePropertiesType) {
  const tab = await browser.tabs.create(params);
  return tab;
}

export async function getActiveTab() {
  const tabs = await browser.tabs.query({ active: true });
  return tabs[0];
}

export async function sendMessageToTab(tabId: number, message: unknown) {
  return browser.tabs.sendMessage(tabId, message);
}
export async function openWindow(options: Windows.CreateCreateDataType) {
  const newWindow = await browser.windows.create(options);
  return newWindow;
}

export function getCurrentWindow() {
  return browser.windows.getCurrent();
}

export function onceWindowClosed(windowId: number, callback: () => void | Promise<void>) {
  function onWindowClosed(closedWindowId) {
    if (closedWindowId === windowId) {
      browser.windows.onRemoved.removeListener(onWindowClosed);
      callback();
    }
  }
  browser.windows.onRemoved.addListener(onWindowClosed);
}

export function buildExtensionRoutePath({ route, qs }: { route?: string; qs?: string } = {}) {
  let path = `${getBaseURL()}/pages/popup/index.html`;

  if (route) {
    path += `#${route}`;
  }

  if (qs) {
    path += `?${qs}`;
  }

  return path;
}

export * from './connectToBackground';

export * from './getBrowserApi';

export const handleConnection = (callback: (port: browser.Runtime.Port) => void) =>
  browser.runtime.onConnect.addListener(callback);
