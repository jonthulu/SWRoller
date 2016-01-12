import appDispatcher from '../appDispatcher.js';
import rollerEvents from '../constants/rollerEvents.js';

var rollerActions = {
  addToHand: function rollerActionAddToHand(type) {
    appDispatcher.dispatch({
      actionType: rollerEvents.ROLLER_ADD_TO_HAND,
      type: type
    });
  },

  clearHand: function rollerActionClearHand() {
    appDispatcher.dispatch({
      actionType: rollerEvents.ROLLER_CLEAR_HAND
    });
  },

  clearResults: function rollerActionClearResults() {
    appDispatcher.dispatch({
      actionType: rollerEvents.ROLLER_CLEAR_RESULTS
    });
  },

  removeFromHand: function rollerActionRemoveFromHand(type) {
    appDispatcher.dispatch({
      actionType: rollerEvents.ROLLER_REMOVE_FROM_HAND,
      type:       type
    });
  },

  roll: function rollerActionRoll() {
    appDispatcher.dispatch({
      actionType: rollerEvents.ROLLER_ROLL
    });
  }
};

export default rollerActions;
