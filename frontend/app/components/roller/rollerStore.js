import events from 'events';
import R from 'ramda';
import _ from 'lodash';

import appDispatcher from '../../appDispatcher.js';
import { diceValues, diceSort, diceSymbols, diceOpposites } from '../../constants/dice.js';
import rollerEvents from './rollerEvents.js';

var CHANGE_EVENT = 'roller.change';

var emptyRolled = {
  rolled: [],
  images: [],
  stats:  {}
};

var privateRoller = {
  hand:   [],
  rolled: _.clone(emptyRolled, true),

  clearAll:            function pRollerClearAll() {
    privateRoller.rolled = _.clone(emptyRolled, true);
    privateRoller.hand   = [];
  },
  clearRolled:         function pRollerClearRolled() {
    privateRoller.rolled = _.clone(emptyRolled, true);
  },
  updateRolled:        function pRollerUpdateRolled(newRolled) {
    privateRoller.rolled = newRolled;
  },
  addToHand:           function pRollerAddToHand(type) {
    privateRoller.hand = R.sort(
      diceSort,
      R.append(type, privateRoller.hand)
    );
  },
  removeFromHand:      function pRollerRemoveFromHand(type) {
    // Find the first instance of type in the array (R.indexOf).
    // Then update it to undefined (R.update).
    // Then remove all undefined from the array (R.reject).
    // Then sort the array (R.sort).
    privateRoller.hand = R.sort(
      diceSort,
      R.reject(
        R.equals(undefined),
        R.update(
          R.indexOf(type, privateRoller.hand),
          undefined,
          privateRoller.hand
        )
      )
    );
  },
  rollDice:            function pRollerRollDice(diceToRoll) {
    var face;
    return _.map(diceToRoll, (diceName) => {
      face = Math.floor(Math.random() * diceValues[ diceName ].length);
      return diceValues[ diceName ][ face ];
    });
  },
  calculateStats:      function pRollerCalculateStats(rolledSides) {
    var baseStats = _.reduce(rolledSides, (result, roll) => {
      _.forEach(roll.results, (val, name) => {
        if (!result.hasOwnProperty(name)) {
          result[ name ] = val;
        } else {
          result[ name ] += val;
        }
      });
      return result;
    }, {});

    return _.reduce(baseStats, (result, statValue, statName) => {
      if (statName === 'blank') {
        return result;
      } else if (statValue === 0) {
        return result;
      }

      if (statValue < 0) {
        result[ diceOpposites[ statName ] ] = 0 - statValue;
      } else {
        result[ statName ] = statValue;
      }
      return result;
    }, {});
  },
  calculateStatImages: function pRollerCalculateStatImages(stats) {
    return _.reduce(stats, (adjusted, statValue, statName) => {
      return adjusted.concat(new Array(statValue).fill(diceSymbols[ statName ].image));
    }, []);
  }
};

class RollerStore extends events.EventEmitter {
  getHand() {
    return privateRoller.hand;
  }

  getRolled() {
    return privateRoller.rolled;
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
var rollerStore = new RollerStore();

appDispatcher.register(function rolledRegister(action) {
  var type;

  switch (action.actionType) {
    case rollerEvents.ROLLER_ADD_TO_HAND:
      type = action.type.trim();
      if (type !== '') {
        privateRoller.addToHand(type);
        rollerStore.emitChange();
      }
      break;

    case rollerEvents.ROLLER_CLEAR_ALL:
      privateRoller.clearAll();
      rollerStore.emitChange();
      break;

    case rollerEvents.ROLLER_CLEAR_RESULTS:
      privateRoller.clearRolled();
      rollerStore.emitChange();
      break;

    case rollerEvents.ROLLER_REMOVE_FROM_HAND:
      type = action.type.trim();
      if (type !== '') {
        privateRoller.removeFromHand(type);
        rollerStore.emitChange();
      }
      break;

    case rollerEvents.ROLLER_ROLL:
      if (privateRoller.hand.length) {
        var rolled = privateRoller.rollDice(privateRoller.hand);
        var stats  = privateRoller.calculateStats(rolled);
        var images = privateRoller.calculateStatImages(stats);
        privateRoller.updateRolled({
          rolled: rolled,
          images: images,
          stats:  stats
        });
        rollerStore.emitChange();
      }
      break;

    default:
      // Do nothing.
      break;
  }
});

export default rollerStore;
