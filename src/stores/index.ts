import lodash from 'lodash';
import {observable} from 'mobx';

import {StoreCollection} from './common/StoreCollection';

/**
 * Notes: Make sure @types/webpack-env is installed.
 */
type RequireContext = __WebpackModuleApi.RequireContext;

/**
 * Defines what the collection of stores looks like.
 */
type StoresRecord = Record<string, StoreCollection<object> | object>;

/**
 * Uses webpack's require.context to get all store files.
 */
function getStoreContext(): RequireContext {
  return require.context('./', true, /^\.\/([^/]+\/)*.+Store\.js$/);
}

/**
 * Inject all the stores from stores/* folders using Webpack magic (require.context).
 * We are doing this in lieu of importing each store and manually doing an Object.assign().
 */
function getStores(storeContext?: RequireContext): StoresRecord {
  const storeModules = storeContext || getStoreContext();

  const allStores: StoresRecord = {};

  storeModules.keys().forEach((modulePath) => {
    const moduleData = storeModules(modulePath);

    if (moduleData.doNotInject) {
      return;
    }

    let storeName = moduleData.storeName;
    if (!storeName) {
      const nameParts = String(modulePath).split('/');
      storeName = String(nameParts.pop()).split('.')[0];
    }

    allStores[String(storeName)] = moduleData.default;
  });

  allStores.rootStore = Object.assign({}, allStores);

  return allStores;
}

// Inject all the stores from state/* folders using Webpack magic (require.context).
// We are doing this in lieu of importing each store and manually doing an Object.assign().
const storeModules = getStoreContext();
const providedStores = observable(getStores(storeModules));

/**
 * Hot reloads the stores.
 */
export function hotReloadStores(currentStores: StoresRecord): void {
  if (!module.hot) {
    return;
  }

  // Enable Webpack hot module replacement for stores
  module.hot.accept(storeModules.id, () => {
    lodash.forEach(getStores(), (newStore, storeName) => {
      currentStores[storeName] = newStore;
    });
  });
}

export default providedStores;
