import lodash from 'lodash';
import {observable} from 'mobx';

import {StoreCollection} from '../stores/common/StoreCollection';

/**
 * Notes: Make sure @types/webpack-env is installed.
 */
type RequireContext = __WebpackModuleApi.RequireContext;

/**
 * Defines what the collection of dice sets looks like.
 */
type DiceSetsRecord = Record<string, StoreCollection<object> | object>;

/**
 * Uses webpack's require.context to get all dice set files.
 */
function getDiceSetContext(): RequireContext {
  return require.context('./', true, /^\.\/([^/]+\/)*.DiceSet\.ts$/);
}

/**
 * Inject all the dice sets from diceSets/* folders using Webpack magic (require.context).
 * We are doing this in lieu of importing each diceSets and manually doing an Object.assign().
 */
function getDiceSets(diceSetContext?: RequireContext): DiceSetsRecord {
  const diceSetModules = diceSetContext || getDiceSetContext();

  const allDiceSets: DiceSetsRecord = {};

  diceSetModules.keys().forEach((modulePath) => {
    const moduleData = diceSetModules(modulePath);

    if (moduleData.doNotInject) {
      return;
    }

    let diceSetName = moduleData.diceSetName;
    if (!diceSetName) {
      const nameParts = String(modulePath).split('/');
      diceSetName = String(nameParts.pop()).split('.')[0];
    }

    allDiceSets[String(diceSetName)] = moduleData.default;
  });

  return allDiceSets;
}

// Inject all the stores from state/* folders using Webpack magic (require.context).
// We are doing this in lieu of importing each store and manually doing an Object.assign().
const diceSetModules = getDiceSetContext();
const providedDiceSets = observable(getDiceSets(diceSetModules));

/**
 * Hot reloads the dice sets.
 */
export function hotReloadDiceSets(currentDiceSets: DiceSetsRecord): void {
  if (!module.hot) {
    return;
  }

  // Enable Webpack hot module replacement for stores
  module.hot.accept(diceSetModules.id, () => {
    lodash.forEach(getDiceSets(), (newDiceSet, diceSetName) => {
      currentDiceSets[diceSetName] = newDiceSet;
    });
  });
}

export default providedDiceSets;
