import events from 'events';
import _ from 'lodash';

import appDispatcher from '../appDispatcher.js';
import { diceSort } from '../constants/dice.js';
import rollerEvents from '../constants/rollerEvents.js';

const CHANGE_EVENT = 'rolled.change';

var emptyRolled = {
  rolled: [],
  images: [],
  stats:  {}
};

var privateRolled = {
  rolled: _.clone(emptyRolled, true),
  clearRolled: function privateRolledClearRolled() {
    privateRolled.rolled = _.clone(emptyRolled, true);
  }
};

class RolledStore extends events.EventEmitter {
  getRolled() {
    return privateRolled.rolled;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}
var rolledStore = new RolledStore();

appDispatcher.register(function rolledRegister(action) {
  switch (action.actionType) {
    case rollerEvents.ROLLER_CLEAR_RESULTS:
      privateRolled.clearRolled();
      rolledStore.emitChange();
      break;

    case rollerEvents.ROLLER_UPDATE_RESULTS:
      if (action.results) {
        privateRolled.rolled = actions.results;
        rolledStore.emitChange();
      }
      break;

    default:
      // Do nothing.
      break;
  }
});

export default rolledStore;
