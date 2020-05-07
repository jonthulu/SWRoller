import lodash from 'lodash';

import {SwDie, SwDieSide, dice, diceSymbols, diceOpposites, diceSort, SwSymbol} from './swDice';
import {StoreCollection} from '../../stores/common/StoreCollection';
import {DiceStoreResult, useDiceStore} from '../common/diceStoreBase';
import {DieSymbolDisplay} from '../common/dieSymbol';

type SwStatsType = Record<string, number>;

/**
 * Gets all the possible dice types in the set.
 */
export const getDiceTypes = (): Record<string, SwDie> => {
  return {...dice};
};

/**
 * Handles interactions with a set of SW dice.
 */
export function useSwDiceSet(): DiceStoreResult<SwSymbol, SwStatsType>
{
  /**
   * Calculates the final stat values for all rolled faces.
   */
  const calculateStats = (rolledFaces: SwDieSide[]): SwStatsType =>
  {
    // First aggregate all the stat values for every face.
    const allStatValues = lodash.reduce(rolledFaces, (final: Record<string, number>, face: SwDieSide) => {
      return face.addStatsToAggregate(final);
    }, {});

    // Then only return positive final values.
    return lodash.reduce(allStatValues, (result: SwStatsType, statValue, statName) => {
      if (statName === 'blank') {
        return result;
      } else if (statValue === 0) {
        return result;
      }

      if (statValue < 0) {
        // We need to convert negatives to their opposite stat (-2 advantage = 2 threat, etc).
        result[diceOpposites[statName]] = 0 - statValue;
      } else {
        result[statName] = statValue;
      }

      return result;
    }, {});
  };

  /**
   * Gets display for stats.
   */
  const getDisplayForStats = (rolledStats: SwStatsType): DieSymbolDisplay[] =>
  {
    return lodash.reduce(rolledStats, (adjusted: DieSymbolDisplay[], statValue, statName) => {
      const display = diceSymbols[statName].display;
      lodash.times(statValue, () => adjusted.push(display));
      return adjusted;
    }, []);
  };

  return useDiceStore<SwSymbol, SwStatsType>(calculateStats, getDisplayForStats, diceSort);
}

export const swDiceSets = new StoreCollection(useSwDiceSet);
