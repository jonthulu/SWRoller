import lodash from 'lodash';
import * as ramda from 'ramda';
import {useState} from 'react';

import {Die} from './die';
import {DieSide} from './dieSide';
import {DieSymbolDisplay} from './dieSymbol';

export type RollHistoryType<SymbolType, StatsType> = {
  rolledSides: DieSide<SymbolType>[];
  displays: DieSymbolDisplay[];
  stats: StatsType;
}

export type DiceStoreResult<SymbolType, StatsType> = {
  hand: Die<SymbolType>[];
  rollHistory: RollHistoryType<SymbolType, StatsType>[];
  addToHand: (newDie: Die<SymbolType>) => void;
  removeFromHand: (dieToRemove: Die<SymbolType>) => void;
  emptyHand: () => void;
  roll: () => void;
};

/**
 * The dice base store.
 */
export function useDiceStore<SymbolType, StatsType>(
  calculateStats: (rolledFaces: DieSide<SymbolType>[]) => StatsType,
  getDisplayForStats: (rolledStats: StatsType) => DieSymbolDisplay[],
  diceSorter?: (aDie: Die<SymbolType>, bDie: Die<SymbolType>) => number
): DiceStoreResult<SymbolType, StatsType>
{
  const [hand, setHand] = useState([] as Die<SymbolType>[]);
  const [rollHistory, setRollHistory] = useState([] as RollHistoryType<SymbolType, StatsType>[]);

  /**
   * Setter for the hand.
   * This will sort any hand given to it.
   */
  const sortAndSetHand = (newHand: Die<SymbolType>[]): void => {
    if (diceSorter) {
      setHand(ramda.sort(diceSorter, newHand));
    } else {
      setHand(newHand);
    }
  };

  /**
   * Adds a die to the hand.
   */
  const addToHand = (newDie: Die<SymbolType>): void => {
    const newHand = ramda.append(newDie.clone(), hand);
    sortAndSetHand(newHand);
  };

  /**
   * Removes a die from the hand.
   */
  const removeFromHand = (dieToRemove: Die<SymbolType>): void => {
    const newHand = hand.filter((die) => {
      return (die.id !== dieToRemove.id);
    });

    sortAndSetHand(newHand);
  };

  /**
   * Removes all dice from the hand.
   */
  const emptyHand = (): void => {
    setHand([]);
  };

  /**
   * Records a roll in the state history.
   */
  const recordRoll = (rolledSides: DieSide<SymbolType>[], displays: DieSymbolDisplay[], stats: StatsType): void => {
    const newRoll = {
      rolledSides,
      displays,
      stats,
    };

    const newHistory = ramda.prepend(newRoll, rollHistory);
    setRollHistory(newHistory);
  };

  /**
   * Rolls the dice that have been added to the hand.
   */
  const roll = (): void => {
    const rolledFaces = lodash.map(hand, (swDice: Die<SymbolType>): DieSide<SymbolType> => {
      const faceIndex = Math.floor(Math.random() * swDice.sides.length);
      return swDice.sides[faceIndex];
    });

    const stats = calculateStats(rolledFaces);
    const display = getDisplayForStats(stats);

    recordRoll(rolledFaces, display, stats);
  };

  return {
    hand,
    rollHistory,
    addToHand,
    removeFromHand,
    emptyHand,
    roll,
  };
}

export const doNotInject = true;
