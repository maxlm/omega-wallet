import { getBrowserApi } from './getBrowserApi';

export function getBaseURL() {
  return getBrowserApi().runtime.getURL('src');
}
