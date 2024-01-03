import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { App } from '@src/dAppUI/App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createProxyStore } from './createProxyStore';
import './index.css';

refreshOnUpdate('pages/popup');

function init() {
  const store = createProxyStore();
  store.ready().then(() => {
    const appContainer = document.querySelector('#app-container');
    if (!appContainer) {
      throw new Error('Can not find #app-container');
    }
    const root = createRoot(appContainer);
    root.render(
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>,
    );
  });
}

init();
