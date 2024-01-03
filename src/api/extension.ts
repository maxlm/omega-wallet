import {
  openWindow,
  buildExtensionRoutePath,
  getActiveTab,
  sendMessageToTab,
  getCurrentWindow,
  onceWindowClosed,
} from '../shared/browser/extension';

export type OpenPopupWindowParams = {
  route?: string;
  qs?: string;
  onClose?: () => void | Promise<void>;
};

const openPopupWindow = async ({ route, qs, onClose }: OpenPopupWindowParams = {}) => {
  const currentWindow = await getCurrentWindow();
  const windowWidth = currentWindow.width || 360;
  const window = await openWindow({
    url: buildExtensionRoutePath({ route, qs }),
    width: 360,
    height: 480,
    top: 0,
    type: 'popup',
    left: windowWidth - 360,
  });
  if (onClose) {
    onceWindowClosed(window.id, onClose);
  }
  return window;
};

export type BaseTabMessageParams<TData = unknown> = {
  messageId: string | number;
  data: TData;
  error?: unknown;
  tabId?: number;
};

const tabs = {
  async sendMessage<T = unknown>(params: BaseTabMessageParams<T>) {
    const { messageId, tabId: messageTabId, data, error } = params;
    let tabId: number;
    if (!messageTabId) {
      const activeTab = await getActiveTab();
      tabId = activeTab.id;
    } else {
      tabId = messageTabId;
    }

    return sendMessageToTab(tabId, { messageId, data, error });
  },
};
export const extensionApi = {
  openPopupWindow,
  tabs,
};
