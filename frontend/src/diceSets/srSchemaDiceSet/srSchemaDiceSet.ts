import lodash from 'lodash';

import {SrSchemaDie, SrSchemaDieSide, dice, diceSymbols, diceSort, SrSchemaSymbol} from './srSchemaDice';
import {StoreCollection} from '../../stores/common/StoreCollection';
import {DiceStoreResult, useDiceStore} from '../common/diceStoreBase';
import {DieSymbolDisplay} from '../common/dieSymbol';

type SrSchemaStatsType = Record<string, number>;

/**
 * Gets all the possible dice types in the set.
 */
export const getDiceTypes = (): Record<string, SrSchemaDie> => {
  return {...dice};
};

/**
 * Handles interactions with a set of SR-Schema dice.
 */
export function useSrSchemaDiceSet(): DiceStoreResult<SrSchemaSymbol, SrSchemaStatsType>
{
  /**
   * Calculates the final stat values for all rolled faces.
   */
  const calculateStats = (rolledFaces: SrSchemaDieSide[]): SrSchemaStatsType =>
  {
    return lodash.reduce(rolledFaces, (result: SrSchemaStatsType, face: SrSchemaDieSide) => {
      const key = face.name;

      if (result[key] === undefined) {
        result[key] = 1;
      } else {
        result[key] += 1;
      }

      return result;
    }, {});
  };

  /**
   * Gets display for stats.
   */
  const getDisplayForStats = (rolledStats: SrSchemaStatsType): DieSymbolDisplay[] =>
  {
    return lodash.reduce(rolledStats, (adjusted: DieSymbolDisplay[], statValue, statName) => {
      const display = diceSymbols[statName].display;
      lodash.times(statValue, () => adjusted.push(display));
      return adjusted;
    }, []);
  };

  return useDiceStore<SrSchemaSymbol, SrSchemaStatsType>(calculateStats, getDisplayForStats, diceSort);
}

export const srSchemaDiceSets = new StoreCollection(useSrSchemaDiceSet);
