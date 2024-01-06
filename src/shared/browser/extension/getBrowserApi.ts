import browser, { Tabs, Windows } from 'webextension-polyfill';

export function getBrowserApi() {
  return browser;
}
