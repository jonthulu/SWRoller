/* eslint-disable import/default */

import {createBrowserHistory as createHistory} from 'history';
import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';

// import {configure} from 'mobx';

// Polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'url-search-params-polyfill';

import App from './components/app/App';
import stores, {hotReloadStores} from './stores/index';

// import {enableMobXLogger} from './utils/debugHelper';
import {registerHistory} from './utils/history';
import env from './config/env';

const routerHistory = createHistory();
registerHistory(routerHistory);

if (env === 'development') {
  // configure({enforceActions: 'observed'});
}

// enableMobXLogger(true);
hotReloadStores(stores);

const renderApplication = (Component: React.FC): void => {
  render(
    <AppContainer>
      <Router history={routerHistory}>
        <Component />
      </Router>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApplication(App);
